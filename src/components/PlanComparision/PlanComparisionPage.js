import React from "react";
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";

const PlanComparisonPage = () => {
  const location = useLocation();
  const selectedPlans = location.state?.selectedPlans || [];

  // Mock data (should match the plans from the previous page)
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "$20/month",
      bandwidth: "50 GB",
      speed: "10 Mbps",
      routerCharges: "Free",
      connectivityType: "Fiber",
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "$40/month",
      bandwidth: "200 GB",
      speed: "50 Mbps",
      routerCharges: "$10",
      connectivityType: "DSL",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$70/month",
      bandwidth: "500 GB",
      speed: "100 Mbps",
      routerCharges: "Free",
      connectivityType: "Fiber",
    },
    {
      id: 4,
      name: "Ultimate Plan",
      price: "$100/month",
      bandwidth: "1 TB",
      speed: "1 Gbps",
      routerCharges: "$15",
      connectivityType: "Fiber",
    },
  ];

  // Filter selected plans
  const filteredPlans = plans.filter((plan) => selectedPlans.includes(plan.id));

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Compare Selected Plans
      </Typography>

      {filteredPlans.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Price</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.price}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Bandwidth</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.bandwidth}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Speed</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.speed}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Router Charges</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.routerCharges}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Connectivity Type</TableCell>
              {filteredPlans.map((plan) => (
                <TableCell key={plan.id}>{plan.connectivityType}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Typography color="error" variant="h6">
          No plans selected for comparison.
        </Typography>
      )}
    </div>
  );
};

export default PlanComparisonPage;
