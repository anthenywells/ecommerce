import React from "react";
import { API } from "../config";
import styled from "styled-components"

const ProductImage = styled.div`
  height: 200px;
  width: 100%;
  text-align: center;
`;
const ImageResponsive = styled.img`
  height: 200px;
`;

const ProductPhoto = ({ item, url }) => (
  <ProductImage>
    <ImageResponsive
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
    />
  </ProductImage>
);

export default ProductPhoto;
