const COLORS = {
    light: {
      primary: "#007BFF",      // Main Blue
      primaryDark: "#0056b3",  // Darker Blue (Hover)

      success: "#28A745",      // Green (Success)
      warning: "#FFC107",      // Yellow (Pending)
      danger: "#DC3545",       // Red (Error)

      background: "#F8F9FA",   // Light Theme Background
      card: "#FFFFFF",         // Light Card Background
      text: "#212529",         // Dark Text for readability

      gradient: "linear-gradient(90deg, #007BFF 0%, #3399FF 100%)",
    },

    dark: {
      primary: "#3399FF",      // Light Blue (For better contrast)
      primaryDark: "#007BFF",  // Brighter Blue

      success: "#1E7E34",      // Dark Green
      warning: "#FFB300",      // Dark Yellow
      danger: "#C82333",       // Dark Red

      background: "#121212",   // Dark Theme Background
      card: "#1E1E1E",         // Dark Card Background
      text: "#E0E0E0",         // Light Text for readability

      gradient: "linear-gradient(90deg, #3399FF 0%, #007BFF 100%)",
    },
  };

  export default COLORS;
