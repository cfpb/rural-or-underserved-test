[
  '{{repeat(25)}}',
  {
    type: 'FeatureCollection',
    query: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    features: [
      '{{repeat(0,4)}}',
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: ['{{floating(-90.000001, 90)}}', '{{floating(-180.000001, 180)}}', 0]
        },
        properties: {
          address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
          alt_addresses: [
            '{{repeat(0,3)}}',
            {
            address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}'
            }
          ],
          load_date: '{{integer(1111111111111, 9999999999999)}}',
          county: '{{state()}}',
          census_block: '{{floating(1, 10, 2)}}',
          rural_underserved: '{{bool()}}'
        }
      }
    ],
    status: function (features) {
        if (features.length > 0){
            return 'OK'
        } else {
            return 'No Results'
        }
    }
  }
]