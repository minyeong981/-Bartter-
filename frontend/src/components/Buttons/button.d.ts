interface Primary {
  buttonStyle: {
    style: 'primary';
    size: 'large' | 'medium' | 'small' | 'tiny';
  };
}

interface Mono {
  buttonStyle: {
    style: 'mono';
    size: 'large' | 'medium' | 'small' | 'tiny';
  };
}

interface Outlined {
  buttonStyle: {
    style: 'outlined';
    size: 'large' | 'medium' | 'small' | 'tiny';
  };
}

interface Flexible {
  buttonStyle: {
    style: 'flexible';
    type: 'primary' | 'mono' | 'outlined';
  };
}

interface Float {
  buttonStyle: {
    style: 'float';
  };
}

// primary, mono, outlined

type ButtonStyle = Primary | Mono | Outlined | Flexible | Float;