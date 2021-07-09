if (store.get('ar_com')) {
  const autoref = new SerialPort(store.get('ar_com'), {
    autoOpen: true
  }, err => {
    return
  })
  if (autoref.isOpen) {
    autoref.flush(console.log('flushed'))
  }
  const autoref_parser = autoref.pipe(new Readline({
    delimiter: hextoascii("0x04")
  }));
  autoref_parser.on('data', data => {
    var theData = data.split("\n");
    console.log(theData)
    if (theData.length > 7) {
      var obj = {
        'MarcoData-XML': {
          'DataSet': {
            'RM_Data_OD': {
              'Sphere_OD': numeral(theData[7].slice(0, 6)).format('+0.00'),
              'Cylinder_OD': numeral(theData[7].slice(6, 12)).format('+0.00'),
              'Axis_OD': numeral(theData[7].slice(12, 15)).format('000')
            },
            'KM_Data_OD': {
              'KM_Diopt_R1_OD': numeral(theData[9].slice(5, 10)).format('00.00'),
              'KM_mm_FlatAXS_OD': numeral(theData[9].slice(10, 13)).format('000'),
              'KM_Diopt_R2_OD': numeral(theData[9].slice(18, 23)).format('00.00'),
              'KM_mm_SteepAXIS_OD': numeral(theData[9].slice(23, 26)).format('000')
            },
            'RM_Data_OS': {
              'Sphere_OS': numeral(theData[11].slice(0, 6)).format('+0.00'),
              'Cylinder_OS': numeral(theData[11].slice(6, 12)).format('+0.00'),
              'Axis_OS': numeral(theData[11].slice(12, 15)).format('000')
            },
            'KM_Data_OS': {
              'KM_Diopt_R1_OS': numeral(theData[13].slice(5, 10)).format('00.00'),
              'KM_mm_FlatAXS_OS': numeral(theData[13].slice(10, 13)).format('000'),
              'KM_Diopt_R2_OS': numeral(theData[13].slice(18, 23)).format('00.00'),
              'KM_mm_SteepAXIS_OS': numeral(theData[13].slice(23, 26)).format('000')
            },
              "RM_Data_OU": {
                "DistVA_OU": " ",
                "DistVA_OU_Ext": " ",
                "PHVA_OU": " ",
                "PHVA_OU_Ext": " ",
                "PD": numeral(theData[15].slice(0, 2)).format('00'),
              },
          }
        }
      };
      var xml = builder.create(obj).end({
        pretty: true
      });
      console.log(xml);
      fs.writeFile(`${store.get('xml_path')}\\new\\ar${Date.now()}.xml`, xml, function(err) {
        if (err) return console.log(err);
      });

    }

  })
}