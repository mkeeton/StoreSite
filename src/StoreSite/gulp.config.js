module.exports = function () {
    var config = {
        tsSource: "app/**/*.ts",
        appSassSource: "app/**/*.scss",
        appSassDest: "app",
        appCssSource: "app/**/*.css",
        aotDestination: "aot/**/*.*",
        rollupDestination: "wwwroot/dist/*.*"
    };

    return config
}