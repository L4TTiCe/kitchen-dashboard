export function getSubLocations(location, path='') {
    let subLocations = [];

    location.name = path + location.name;

    if (location.subLocations.length > 0) {
        location.subLocations.forEach((subL) => {
            subLocations = subLocations.concat(getSubLocations(subL, location.name + ' -> '));
        });
    }

    subLocations.push(location);
    return subLocations;
}
