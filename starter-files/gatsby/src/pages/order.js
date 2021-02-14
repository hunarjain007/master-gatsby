import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import OrderStlyes from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderStlyes>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValues}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValues}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() =>
                        addToOrder({
                          id: pizza.id,
                          size,
                        })
                      }
                    >
                      {size}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStlyes>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
