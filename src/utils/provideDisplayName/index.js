function provideDisplayName(prefix, Component) {
    const componentName = Component.displayName || Component.name;

    return componentName ? `${prefix}(${componentName})` : prefix;
}

export default provideDisplayName;
