function provideDisplayName(prefix, Component) {
    var componentName = Component.displayName || Component.name;

    return componentName ? prefix + "(" + componentName + ")" : prefix;
}

export default provideDisplayName;