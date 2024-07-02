import { stat } from "fs";
import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import {
  calculatePercent,
  categoriesCountFunc,
  chartData,
} from "../utils/features.js";
import { Order } from "../models/order.js";
import { json } from "stream/consumers";
import { config } from "dotenv";

//*---------------- DASHBOARD STATS ----------------

export const dashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};
  const key = "Admin-stats";

  if (myCache.has(key)) stats = JSON.parse(myCache.get(key)!);
  else {
    const today = new Date();

    /*
      ----  code logic -----
      now we want 6 montha ago month
      let current month = october /10
      so , sixmonth ago = april / 4
    
      but this value is depends on the current Month
      and we have to consider only last 6 manths but current month is variable
      , 
      ---- code break down----
      sixMonthAgo == today date
    
      and we set the sixMonthAgo month is difference of current month and 6
      that is actually we want
    
      */

    const sixMonthAgo = new Date();

    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

    /*
        why we need current month start date and last month start date
        so lets take a example of orders
        so for example last month we have 150 orders
        and this month we have 200 orders
        so we gain  200-150 /150 *100 33.33 % increased in orders
       */
    const currentMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };

    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const currentMonthUsersPromise = User.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });

    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const currentMonthProductsPromise = Product.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const currentMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: currentMonth.start,
        $lte: currentMonth.end,
      },
    });

    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });

    const latestTransactionsPromis = Order.find({})
      .select(["orderItems", "status", "total", "discount"])
      .limit(5);

    const [
      currentMonthUser,
      currentMonthProducts,
      currentMonthOrders,
      lastMonthUsers,
      lasttMonthProducts,
      lastMonthOrders,
      allUser,
      allProduct,
      allOrder,
      lastSixMonthOrders,
      categories,
      userfemaleCount,
      latestTransactionsCount,
    ] = await Promise.all([
      currentMonthUsersPromise,
      currentMonthProductsPromise,
      currentMonthOrdersPromise,
      lastMonthUsersPromise,
      lastMonthProductsPromise,
      lastMonthOrdersPromise,
      User.countDocuments(),
      Product.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ gender: "female" }),
      latestTransactionsPromis,
    ]);

    /*
    HIGER ORDER FUNCITONS -- reduce.((initialPara,element,index)=>{
    return some operations
    },initalParaValue) 
    initalParaValue=0 [in our case or for calculating sum its always be zero]
    const arr= [5,1,2,,5,3,4,7,5]
    const totalArr= arr.reduce((total,ele)=>total+=ele || 0 ,0)
    const totalArr=32
    */

    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + order.total || 0,
      0
    );

    const currentMonthRevenue = currentMonthOrders.reduce(
      (total, order) => total + order.total || 0,
      0
    );

    const changePercentages = {
      user: calculatePercent(lastMonthUsers.length, currentMonthUser.length),
      products: calculatePercent(
        lasttMonthProducts.length,
        currentMonthProducts.length
      ),
      orders: calculatePercent(
        lastMonthOrders.length,
        currentMonthOrders.length
      ),
      revenue: calculatePercent(lastMonthRevenue, currentMonthRevenue),
    };

    const totalRevenue = allOrder.reduce(
      (total, order) => total + order.total || 0,
      0
    );

    const counts = {
      totalRevenue,
      users: allUser,
      products: allProduct,
      orders: allOrder.length,
    };
    const orderMontlyCount = new Array(6).fill(0);
    //*    [ 0,0,0,0,0,0 ]
    const orderMonthlyRevenue = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const orderCreationDate = order.createdAt;
      const monthDiffernce =
        (today.getMonth() - orderCreationDate.getMonth() + 12) % 12;
      //monthDiffernce<6 = product is created in last six month
      // array.length-1 == final index [zero index,first index,second index,third index,fourth index,final index]
      if (monthDiffernce < 6) {
        orderMontlyCount[orderMontlyCount.length - 1 - monthDiffernce] =
          orderMontlyCount[orderMontlyCount.length - monthDiffernce - 1] + 1;
        orderMonthlyRevenue[orderMonthlyRevenue.length - 1 - monthDiffernce] =
          orderMonthlyRevenue[orderMonthlyRevenue.length - monthDiffernce - 1] +
          order.total;
      }
    });

    const categoryCount = await categoriesCountFunc({
      categories,
      allProduct,
    });

    const usersRatio = {
      male: allUser - userfemaleCount,
      female: userfemaleCount,
    };

    const ModifiedlatestTransactionsCount = latestTransactionsCount.map(
      (ele) => ({
        _id: ele._id,
        discount: ele.discount,
        amount: ele.total,
        status: ele.status,
        quantity: ele.orderItems.length,
      })
    );

    stats = {
      categoryCount,
      changePercentages,
      counts,

      graph: {
        order: orderMontlyCount,
        revenue: orderMonthlyRevenue,
      },

      usersRatio,
      latestTransactionsCount: ModifiedlatestTransactionsCount,
    };

    myCache.set(key, JSON.stringify(stats));
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});

//*----------------PIE CHART---------------

export const getPieChart = TryCatch(async (req, res, next) => {
  let charts;
  const key = "Admin-pie-charts";
  if (myCache.has(key)) charts = JSON.parse(myCache.get(key)!);
  else {
    const allOrdersPromise = Order.find({}).select([
      "total",
      "discount",
      "shippingCharges",
      "tax",
    ]);

    const [
      orderProcesscount,
      orderShippedCount,
      orderDeliverdCount,
      categories,
      allProduct,
      productsOutOfStocks,
      allOrders,
      adminCount,
      usersCount,
      usersWithDOB,
    ] = await Promise.all([
      Order.countDocuments({ status: "Processing" }),
      Order.countDocuments({ status: "Shipped" }),
      Order.countDocuments({ status: "Delivered" }),
      Product.distinct("category"),
      Product.countDocuments(),
      Product.countDocuments({ stock: 0 }),
      allOrdersPromise,
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "user" }),
      User.find({}).select("dob"),
    ]);

    const orderFullfillment = {
      processing: orderProcesscount,
      shipped: orderShippedCount,
      deliverd: orderDeliverdCount,
    };

    const categoryCount = await categoriesCountFunc({
      categories,
      allProduct,
    });

    const stocksAvailability = {
      outOfStocks: productsOutOfStocks,
      inStocks: allProduct - productsOutOfStocks,
    };

    const grossProfit = allOrders.reduce(
      (total, order) => (total += order.total || 0),
      0
    );

    const totalDiscount = allOrders.reduce(
      (total, order) => (total += order.discount || 0),
      0
    );

    const totalTax = allOrders.reduce(
      (total, order) => (total += order.tax || 0),
      0
    );

    const totalShippingCharges = allOrders.reduce(
      (total, order) => (total += order.shippingCharges || 0),
      0
    );
    config();
    const marketCostPercent = process.env.MARKETING_COST_PERCENTAGE;

    const totalMarketingCost = Math.round(
      (Number(marketCostPercent) / 100) * grossProfit
    );

    const netProfit =
      grossProfit -
      totalTax -
      totalDiscount -
      totalShippingCharges -
      totalMarketingCost;

    const revenueDistribution = {
      netMargin: netProfit,
      discount: totalDiscount,
      burnt: totalTax,
      productionCost: totalShippingCharges,
      marketingCost: totalMarketingCost,
    };

    const admin_Customer = {
      admin: adminCount,
      customers: usersCount,
    };

    const userAgeGroup = {
      teen: usersWithDOB.filter((user) => user.age < 20).length,
      adult: usersWithDOB.filter((user) => user.age >= 20 && user.age < 40)
        .length,
      odl: usersWithDOB.filter((user) => user.age >= 40).length,
    };

    charts = {
      orderFullfillment,
      categoryCount,
      stocksAvailability,
      revenueDistribution,
      admin_Customer,
      userAgeGroup,
    };

    myCache.set(key, JSON.stringify(charts));
  }
  return res.status(200).json({
    success: true,
    charts,
  });
});

//*----------------BAR CHART---------------

export const barChart = TryCatch(async (req, res, next) => {
  let chart;

  const key = "Admin-bar-chart";
  if (myCache.has(key)) chart = JSON.parse(myCache.get(key)!);
  else {
    const today = new Date();

    const lastSixMonths = new Date();
    lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);

    const lastTwelveMonths = new Date();
    lastTwelveMonths.setMonth(lastTwelveMonths.getMonth() - 12);

    const lastSixMonthUser = User.find({
      createdAt: {
        $gte: lastSixMonths,
        $lte: today,
      },
    }).select("createdAt");

    const lastSixMonthProduct = Product.find({
      createdAt: {
        $gte: lastSixMonths,
        $lte: today,
      },
    }).select("createdAt");

    const lastTwelveMonthOrder = Order.find({
      createdAt: {
        $gte: lastTwelveMonths,
        $lte: today,
      },
    }).select("createdAt");

    const [users, products, orders] = await Promise.all([
      lastSixMonthUser,
      lastSixMonthProduct,
      lastTwelveMonthOrder,
    ]);

    /*
to find which product is create on which month and same for 
user (which user was created on which month )
*/

    const usersCounts = chartData({ docArr: users, length: 6, today });

    const prouductsCounts = chartData({ length: 6, today, docArr: products });

    const ordersCounts = chartData({ length: 12, today, docArr: orders });

    chart = {
      usersCounts,
      prouductsCounts,
      ordersCounts,
    };

    myCache.set(key, JSON.stringify(chart));
  }

  return res.status(200).json({
    success: true,
    chart,
  });
});

//*----------------LINE CHART---------------

export const lineChart = TryCatch(async (req, res, next) => {

let chart;
const key ='Admin-line-charts';

if (myCache.has(key)) chart = JSON.parse(myCache.get(key)!);

else {
 
    let today = new Date();


  const lastTwelveMonths = new Date();
  lastTwelveMonths.setMonth(lastTwelveMonths.getMonth() - 12);

const baseQuery = {

    createdAt: {
        $gte: lastTwelveMonths,
        $lte: today,
    },
}  

  const lastTwelveonthUser = User.find(baseQuery).select("createdAt");

  const lastTwelveMonthProduct = Product.find(baseQuery).select("createdAt");

  const lastTwelveMonthOrder = Order.find(baseQuery).select(["createdAt","discount","total"]);

  const [users, products, orders] = await Promise.all([
    lastTwelveonthUser,
    lastTwelveMonthProduct,
    lastTwelveMonthOrder,
  ]);

  /*
to find which product is create on which month and same for 
user (which user was created on which month )
*/

  const usersCounts = chartData({ docArr: users, length: 12, today });

  const prouductsCounts = chartData({ length: 12, today, docArr: products });

  const ordersCounts = chartData({ length: 12, today, docArr: orders });


  const discount = chartData({ length: 12, today, docArr: orders ,property:"discount"});
  const revenue = chartData({ length: 12, today, docArr: orders ,property:"total"});



  



  chart = {
    usersCounts,
    prouductsCounts,
    ordersCounts,
    discount,
    revenue
  };

  myCache.set(key, JSON.stringify(chart));
}


    return res.status(200).json({
        success: true,
        chart,
      });
});
