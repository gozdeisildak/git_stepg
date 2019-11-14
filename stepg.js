const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;



const app = express();

const sequelize = new Sequelize('g', 'root', 'Gozde2799', {
  host: 'localhost',
  // port:3306,
  dialect: 'mysql'
});

const Model = Sequelize.Model;

class Order extends Model { }
Order.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderDate: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  company_id: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  customer_id: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'Order'
  // options
});


class orderDetail extends Model { }
orderDetail.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  detailDesc: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  type: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  price: {
    type: Sequelize.DOUBLE
    // allowNull defaults to true
  }
}, {

  sequelize,
  modelName: 'orderDetail'
  // options
}
);


class Company_Parameters extends Model { }
Company_Parameters.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  company_id: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'Company_Parameters'
  // options
});
orderDetail.sync()
Company_Parameters.sync()
Order.sync()

Order.sync({ force: true })
  .then(() => {
    Order.bulkCreate([
      {
        name: "deneme",
        orderDate: "2017-11-29 15:17:10",
        company_id: "corebit",
        customer_id: "x"
      },
      {
        name: "deneme",
        orderDate: "2017-11-29 15:17:10",
        company_id: "turkcell",
        customer_id: "y"
      },
      {
        name: "deneme",
        orderDate: "2017-11-29 15:17:10",
        company_id: "turktelekom",
        customer_id: "z"
      },
      {
        name: "deneme",
        orderDate: "2017-11-29 15:17:10",
        company_id: "vodafone",
        customer_id: "t"
      }
    ])
  });


orderDetail.sync({ force: true })
  .then(() => {
    orderDetail.bulkCreate([
      {
        order_id: 1,
        detailDesc: "abc",
        type: "sandalye",
        price: 300
      },
      {
        order_id: 2,
        detailDesc: "abc",
        type: "sandalye",
        price: 300
      },
      {
        order_id: 2,
        detailDesc: "abc",
        type: "masa",
        price: 100
      },
      {
        order_id: 2,
        detailDesc: "abc",
        type: "sandalye",
        price: 300
      },
      {
        order_id: 3,
        detailDesc: "abc",
        type: "masa",
        price: 300
      },
      {
        order_id: 4,
        detailDesc: "abc",
        type: "sandalye",
        price: 500
      },
      {
        order_id: 4,
        detailDesc: "abc",
        type: "sandalye",
        price: 200
      }
    ])
  });


Company_Parameters.sync({ force: true })
  .then(() => {
    Company_Parameters.bulkCreate([
      {
        type: "username",
        value: "turkcell123",
        company_id: "turkcell"

      },
      {
        type: "vergi_no",
        value: "253",
        company_id: "turkcell"

      },
      {
        type: "fiyat_limiti",
        value: "200",
        company_id: "turkcell"
      },
      {
        type: "username",
        value: "turktelekom123",
        company_id: "turktelekom"

      },
      {
        type: "vergi_no",
        value: "12345",
        company_id: "turktelekom"

      },
      {
        type: "fiyat_limiti",
        value: "300",
        company_id: "turktelekom"
      },
      {
        type: "username",
        value: "corebit123",
        company_id: "corebit"

      },
      {
        type: "vergi_no",
        value: "852",
        company_id: "corebit"

      },
      {
        type: "fiyat_limiti",
        value: "700",
        company_id: "corebit"
      },
      {
        type: "username",
        value: "vodafone123",
        company_id: "vodafone"

      },
      {
        type: "vergi_no",
        value: "253",
        company_id: "vodafone"

      },
      {
        type: "fiyat_limiti",
        value: "1000",
        company_id: "vodafone"
      }

    ])
  });


Order.hasMany(orderDetail, { foreignKey: 'order_id' });
orderDetail.belongsTo(Order, { foreignKey: 'order_id' });

orderDetail.hasMany(orderDetail, {
  foreignKey: 'order_id',
  sourceKey: 'order_id'
});

app.get('/qek', (req, res) => {
  qek(req, res);
})

app.get('/q2', (req, res) => {
  q2(req, res);
})

app.get('/q3', (req, res) => {
  q3(req, res);
})

app.get('/q4', (req, res) => {
  q4(req, res);
})

app.get('/q5', (req, res) => {
  q5(req, res);
})

app.get('/q6', (req, res) => {
  q6(req, res);
})

const qek = (req, res) => {

  Order.findAll({

    include: [{
      model: orderDetail
    }],
    // where: { id: Sequelize.col('order_id') }

  })
    .then(data => {
      return res.send({
        message: 'Question 3',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}




///question 1

const q1 = (req, res) => {
  Order.findAll({
    where: {
      orderDate: {
        [Op.gte]: moment().subtract(10, 'days').toDate()
      }
    }
  })
    .then(data => {
      return res.send({
        message: 'Question 1',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}
//question 2
const q2 = (req, res) => {
  Order.findAll({
    include: [{
      model: orderDetail,
      include: [{
        model: orderDetail,
        where: { type: 'sandalye' }
      }],
      required: true
    }]
  })
    .then(data => {
      return res.send({
        message: 'Question 2',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}



//question 3
const q3 = (req, res) => {

  Order.findAll({

    include: [{
      model: orderDetail,
      where: { type: "sandalye" },
      attribute: "order_id"
    }],
    where: { id: Sequelize.col('order_id') }

  })
    .then(data => {
      return res.send({
        message: 'Question 3',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}

//question 4
const q4 = (req, res) => {

  Order.findAll({
    include: [{
      model: orderDetail,
      include: [{
        model: orderDetail,
        where: { type: { [Op.ne]: 'sandalye' } },
        required: false,
      }],
      where: { type: { [Op.eq]: 'sandalye' } },
    }],
    where: {
      '$orderDetails.orderDetails.type$': null
    },
    // attributes:[[sequelize.literal('distinct `id`'),'id']]
    //attributes:[Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country']

  })
    .then(data => {
      return res.send({
        message: 'Question 4',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}

//question5
const q5 = (req, res) => {

  Order.hasMany(Company_Parameters, { foreignKey: 'company_id', sourceKey: 'company_id' });
  Company_Parameters.belongsTo(Order, { foreignKey: 'company_id', targetKey: 'company_id' });

  Company_Parameters.findAll({
    include: [{
      model: Order,
      include: [{
        model: orderDetail,
        include: [{
          model: orderDetail,
          where: { type: 'sandalye' }
        }],
        required: true
      }],
      required: true
    }],
    required: true,
    where: {
      [Op.or]: {
        type: ["username", "fiyat_limiti"]
      }
    },
    attributes: ['type', 'value']
  })
    .then(data => {
      return res.send({
        message: 'Question 5',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}


//question 6
const q6 = (req, res) => {

  Order.hasMany(Company_Parameters, { foreignKey: 'company_id', sourceKey: 'company_id' });
  Company_Parameters.belongsTo(Order, { foreignKey: 'company_id', targetKey: 'company_id' });

  Company_Parameters.findAll({
    include: [{
      model: Order,
      include: [{
        model: orderDetail,
        include: [{
          model: orderDetail,
          where: { type: 'sandalye' }
        }],
        required: true
      }],
      required: true
    }],
    required: true,
    where: {
      [Op.or]: [
        { type: ["username", "fiyat_limiti"] },
        { [Op.and]: [{ type: "vergi_no" }, { value: "253" }] }
      ]
    },
    attributes: ['type', 'value']
  })
    .then(data => {
      return res.send({
        message: 'Question 6',
        orders: data
      })
    }).catch(error => {
      return res.send('Error:', error)
    })
}


app.listen(3000, () => {

})
