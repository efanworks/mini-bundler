const modules = {
    './a.js': function (module, __mini_require__) {
        const sayHello = () => {
            console.log('Hello');
        }
        module.exports = { sayHello };
    },
    './b.js': function (module, __mini_require__) {
        const eat = () => {
            console.log('eat');
        }
        module.exports = { eat };
    },
    './index.js': function (module, __mini_require__) {
        const { sayHello } = __mini_require__('./a.js');
        const { eat } = __mini_require__('./b.js');
        sayHello();
        eat();
    }
};

(function(modules) {
    const cache = {};

    function __mini_require__(moduleId) {
        if (cache[moduleId]) return cache[moduleId].exports;
        const module = { exports: {} };
        cache[moduleId] = module;
        modules[moduleId](module, __mini_require__);

        return module.exports;
    }

    __mini_require__('./index.js');
})(modules);

