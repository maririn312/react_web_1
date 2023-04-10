import { render } from "@testing-library/react";
import NomadSwiper from "../../../components/swiper/swiper";

describe('NomadSwiper Component Test', () => {
  test('render NomadSwiper component', () => {
    render(
      <NomadSwiper />
    );
  });
})