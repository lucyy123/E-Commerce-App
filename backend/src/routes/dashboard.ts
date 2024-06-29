import { AdminOnly } from './../middlewares/auth.js';
import express from "express"
import { barChart, dashboardStats, getPieChart, lineChart } from "../controllers/dashboard.js";


const app= express.Router();

// get the statistics 
// endPoint - /api/v1/dashboard/stats
app.get("/stats",AdminOnly,dashboardStats)


// get the bar chart details 
// endPoint - /api/v1/dashboard/chart/bar
app.get("/charts/bar",AdminOnly,barChart)

// get the pie chart details 
// endPoint - /api/v1/dashboard/chart/pie
app.get("/charts/pie",AdminOnly,getPieChart)

// get the line chart details 
// endPoint - /api/v1/dashboard/chart/line
app.get("/charts/line",AdminOnly,lineChart)



export default app;