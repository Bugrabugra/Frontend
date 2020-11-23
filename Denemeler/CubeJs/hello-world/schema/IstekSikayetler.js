cube(`IstekSikayetler`, {
  sql: `SELECT * FROM public.istek_sikayetler`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    },

    ilceCount: {
      sql: "id",
      type: "count",
      filters: [
        {sql: `${CUBE}.ilce = 'Ataşehir'`}
      ]
    }
  },
  
  dimensions: {
    geometry: {
      sql: `geometry`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    mahalle: {
      sql: `mahalle`,
      type: `string`
    },
    
    sokak: {
      sql: `sokak`,
      type: `string`
    },
    
    kapi: {
      sql: `kapi`,
      type: `string`
    },
    
    kurumAciklama: {
      sql: `kurum_aciklama`,
      type: `string`
    },
    
    konu: {
      sql: `konu`,
      type: `string`
    },
    
    aciklama: {
      sql: `aciklama`,
      type: `string`
    },
    
    turu: {
      sql: `turu`,
      type: `string`
    },
    
    durumu: {
      sql: `durumu`,
      type: `string`
    },
    
    alani: {
      sql: `alani`,
      type: `string`
    },
    
    ilce: {
      sql: `ilce`,
      type: `string`
    },
    
    tarih: {
      sql: `tarih`,
      type: `time`
    }
  }
});
