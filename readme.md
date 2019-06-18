# Grind JSX

Grind JSX is a thing. Gonna put info here soon and make a readme that doesn't suck.

## Usage

### Migrating React Components

```
/* @jsx grind */

import grind from 'grind-jsx';

const TestComponent = props => {
    return <div className="TestComponent" />
};

export default TestComponent;
```

### Render In React Component

```
import { renderIn } from 'grind';

useEffect(() => {
    renderIn(ref.current, TestComponent, props);
});
```