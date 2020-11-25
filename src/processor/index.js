function handler() {
    console.log("processor:::handler:::handler::(2)", process.env);
    console.log("processor:::handler:::handler::(3)", arguments);
}

module.exports = {handler}