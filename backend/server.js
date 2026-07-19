app.post("/api/triage", (req, res) => {
  res.json({
    urgency: "Medium",
    guidance: [
      "Drink water",
      "Rest",
      "Take medicine",
      "Visit PHC if symptoms worsen"
    ]
  });
});