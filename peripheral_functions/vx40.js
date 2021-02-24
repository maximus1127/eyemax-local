var od = ["0", "0", "0", "0"];
var os = ["0", "0", "0", "0"];
if (store.get('lm_com')) {
  const lensometer = new SerialPort(store.get('lm_com'), {
    autoOpen: true
  }, err => {
    return
  })
  if (lensometer.isOpen) {
    lensometer.flush(console.log('flushed'))
  }
  const lensometer_parser = lensometer.pipe(new Readline({
    delimiter: hextoascii("0x04")
  }));
  lensometer_parser.on('data', data => {
    var dataSplit = data.split("\n");
    if (Object.keys(dataSplit).length > 1) {
      for (e in dataSplit) {
        if (dataSplit[e].includes("RSPH")) {
          od = dataSplit[e].split(';')
        }
        if (dataSplit[e].includes("LSPH")) {
          os = dataSplit[e].split(';')
        }
      }

      var obj = {
        'MarcoData-XML': {
          'DataSet': {
            'Presenting_Data_OD': {
              'Sphere_OD': od[0].includes("RSPH") ? numeral(od[0].slice(od[0].length - 6, od[0].length)).format('+0.00') : null,
              'Cylinder_OD': od[1].includes('CYL') ? numeral(od[1].slice(od[1].length - 6, od[1].length)).format('+0.00') : null,
              'Axis_OD': od[2].includes("AXS") ? numeral(od[2].slice(od[2].length - 3, od[3].length)).format('000') : null,
              'Add_OD': od[3].includes("AD1") ? numeral(od[3].slice(od[3].length - 6, od[3].length)).format('+0.00') : null,
            },
            'Presenting_Data_OS': {
              'Sphere_OS': os[0].includes("LSPH") ? numeral(os[0].slice(os[0].length - 6, os[0].length)).format('+0.00') : null,
              'Cylinder_OS': os[1].includes("CYL") ? numeral(os[1].slice(os[1].length - 6, os[1].length)).format('+0.00') : null,
              'Axis_OS': os[2].includes("AXS") ? numeral(os[2].slice(os[2].length - 3, os[2].length)).format('000') : null,
              'Add_OS': os[3].includes("AD1") ? numeral(os[3].slice(os[3].length - 6, os[3].length)).format('+0.00') : null,
            },
          }
        }
      };
      var xml = builder.create(obj).end({
        pretty: true
      });
      fs.writeFile(store.get('xml_path') + '\\new\\lm.xml', xml, function(err) {
        if (err) return console.log(err);
      });
    }
  })
}