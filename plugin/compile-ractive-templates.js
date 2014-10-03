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

    if(duplicates[basename] && duplicates[basename] != compileStep.inputPath){
        throw new Error("File '"+basename+"'("+compileStep.inputPath+") cannot be compiled as there is already template with name '"+basename+"' stored in file '"+duplicates[basename]+"'")
    }
    duplicates[basename] = compileStep.inputPath;
    var templateTransformedToJs = [
            "var tpl = "+ JSON.stringify(parsedTemplate)+";",
            "Ract.addTemplate('"+basename+"', tpl); "
    ].join('');

    compileStep.addJavaScript({
        path: path.join(path_part, "ract." + basename + ".js"),
        sourcePath: compileStep.inputPath,
        data: templateTransformedToJs
    });
};

Plugin.registerSourceHandler(
    "ract", {isTemplate: true, archMatching: 'web'},
    function (compileStep) {
        parseRactiveTemplates(compileStep);
    }
);
