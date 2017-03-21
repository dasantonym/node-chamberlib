'use strict';

const memwatch = require('memwatch-next'),
      cl = require('../src/index').default,
      path = require('path'),
      Qty = require('js-quantities');

memwatch.on('leak', function (info) {
    console.log(`WARNING: ${info.reason} - Growth: ${info.growth}`);
});

const lmdbOut = new cl.nodes.storage.LMDBNode(),
      lmdbIn = new cl.nodes.storage.LMDBNode(),
      quantize = new cl.nodes.transform.QuantizeTime({ steps: Qty(0.1, 's') });

lmdbOut.openDataSet(path.resolve('../data/lmdb/20151208_15h59m12s_nanobrain'), '20151208_15h59m12s_nanobrain');
lmdbIn.createDataSet(path.resolve('../data/lmdb/20151208_15h59m12s_nanobrain-reduced'), 2.0, '20151208_15h59m12s_nanobrain');

lmdbIn.on('done', () => {
    console.log('done!');
    process.exit(0);
});

lmdbIn.on('error', err => {
    console.log(err.message);
    process.exit(err.code);
});

const outputUuid = lmdbOut.createOutput('20151208_15h59m12s_nanobrain'),
      inputUuid = lmdbIn.createInput({
    '20151208_15h59m12s_nanobrain': lmdbOut.meta.DataSet.DataChannels['20151208_15h59m12s_nanobrain']
}, true);

lmdbOut.outputs[outputUuid].stream.pipe(quantize.stream).pipe(lmdbIn.inputs[inputUuid].stream);

lmdbOut.startOutput(outputUuid);