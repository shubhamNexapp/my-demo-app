import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlanComparision = () => {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState([]);

  // Sample plan data
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

  // Handle plan selection
  const handleSelection = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId));
    } else if (selectedPlans.length < 3) {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  // Navigate to comparison page (placeholder function)
  const navigateToComparisonPage = () => {
    navigate("/comparision-plan", { state: { selectedPlans } });
  };
  return (
    <div className="communication">
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Plan Comparison
        </Typography>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{plan.name}</Typography>
                  <Typography>Price: {plan.price}</Typography>
                  <Typography>Bandwidth: {plan.bandwidth}</Typography>
                  <Typography>Speed: {plan.speed}</Typography>
                  <Typography>Router Charges: {plan.routerCharges}</Typography>
                  <Typography>
                    Connectivity Type: {plan.connectivityType}
                  </Typography>
                  <Checkbox
                    checked={selectedPlans.includes(plan.id)}
                    onChange={() => handleSelection(plan.id)}
                    color="primary"
                  />
                  <Typography>Select for Comparison</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedPlans.length > 1 && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToComparisonPage}
            >
              Compare Selected Plans
            </Button>
            {selectedPlans.length === 3 && (
              <Typography color="error" style={{ marginTop: "10px" }}>
                Maximum of 3 plans can be compared at a time.
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanComparision;
