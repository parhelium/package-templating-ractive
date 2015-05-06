
Ract = function(){};
Ract.templates = {};
Ract.components = {};
Ract.addComponent = function(name, comp){
    Ract.__checkName(name, Ract.components);
    Ract.components[name] = comp
}
Ract.getComponent = function(name){
    var c = Ract.components[name]
    if(c != null){
        return c
    }else{
        throw new Error("Ract : Cannot find component named '"+name+"'.");
    }
}

Ract.addTemplate = function(name, tpl){
    Ract.__checkName(name, Ract.templates);
    Ract.templates[name] = tpl
}
Ract.getTemplate = function(name){
    var tpl = Ract.templates[name]
    if(tpl != null){
        return tpl
    }else{
        throw new Error("Ract : Cannot find template named '"+name+"'.");
    }
}

Ract.__checkName = function (name, where) {
   if (where[name] ){
       throw new Error("Ract : There are multiple templates named '" + name + "'. Each template needs a unique name.");
   }
};