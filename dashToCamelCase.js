const DASH_TO_CAMEL = /-[a-z]/g;
export function dashToCamelCase(dash) {
    return dash.replace(DASH_TO_CAMEL, m => m[1].toUpperCase());
}
