# CSS Organization

This project uses a modular CSS approach to improve maintainability and development workflow.

## Structure

```
styles/
  ├── variables.css            # CSS variables and global constants
  ├── base.css                 # Base styles like typography, resets, and utilities
  ├── components/              # Component-specific styles
  │   ├── Header.css
  │   ├── Footer.css
  │   ├── ProductCard.css
  │   └── Search.css
  └── pages/                   # Page-specific styles
      ├── Home.css
      ├── ProductDetail.css
      ├── Cart.css
      ├── Login.css
      ├── Register.css
      ├── Profile.css
      ├── OrderHistory.css
      └── OrderDetails.css
```

## Guidelines

1. **CSS Variables**: Use variables from `variables.css` for consistent styling.
2. **Component Isolation**: Each component should have its own CSS file.
3. **Page-Specific Styles**: Styles specific to a page should go in the corresponding page CSS file.
4. **Naming Convention**: Use kebab-case for class names (e.g., `.product-card`).
5. **Responsive Design**: Include responsive styles within each component's CSS file.

## Imports

- Import `variables.css` at the top of each CSS file
- In component files, import the corresponding CSS file:
  ```jsx
  import "../styles/components/Header.css";
  ```

## Benefits

- Improved code organization
- Easier maintenance
- Better performance through code splitting
- Simpler debugging
- Easier collaboration
