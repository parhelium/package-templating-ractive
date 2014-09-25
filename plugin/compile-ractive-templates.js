var path = Npm.require('path');
var duplicates = {};
var parseRactiveTemplates = function (compileStep) {
    var contents = compileStep.read().toString('utf8');
    try {
        var parsedTemplate = Ractive.parse(contents);
    } catch (e) {
        throw e;
    }

    var path_part = path.dirname(compileStep.inputPath);
    if (path_part === '.')
        path_part = '';
    if (path_part.length && path_part !== path.sep)
        path_part = path_part + path.sep;
    var ext = path.extname(compileStep.inputPath);
    var basename = path.basename(compileStep.inputPath, ext);

    if(duplicates[basename]){
        throw new Error("File '"+basename+"' cannot be compiled as there is already template with name '"+basename+"' stored in file '"+duplicates[basename]+"'")
    }
    duplicates[basename] = compileStep.inputPath;
    var templateTransformedToJs = "Ract['"+basename+"'] = "+ JSON.stringify(parsedTemplate);
    compileStep.addJavaScript({
        path: path.join(path_part, "ract." + basename + ".js"),
        sourcePath: compileStep.inputPath,
        data: templateTransformedToJs
    });
    console.log("Ract", Ract);

};

Plugin.registerSourceHandler(
    "ract", {isTemplate: true, archMatching: 'web'},
    function (compileStep) {
        parseRactiveTemplates(compileStep);
    }
);
