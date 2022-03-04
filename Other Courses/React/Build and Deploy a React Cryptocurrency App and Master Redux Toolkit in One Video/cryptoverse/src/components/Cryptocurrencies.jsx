import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";


const Cryptocurrencies = () => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  console.log(cryptos);
  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map(currency => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className="crypto-image" alt=""/>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
