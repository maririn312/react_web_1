import { render, RenderOptions } from "@testing-library/react"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { PreloadedState } from "redux"
import { RootState } from "../app/store"
import userReducer from '../redux/user/userSlice';
import categoryReducer from '../redux/category/categorySlice';
import balanceReducer from '../redux/wallet/balanceSlice';
import conditionReducer from '../redux/newAuction/conditionsSlice';

// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>
//   store?: AppStore
// }

// export function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     preloadedState = {
//       conditions: undefined,
//       user: undefined,
//       category: undefined,
//       balance: undefined
//     },
//     // Automatically create a store instance if no store was passed in
//     store = configureStore({ reducer: { user: userReducer }, preloadedState }),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return <Provider store={store}>{children}</Provider>
//   }

//   // Return an object with the store and all of RTL's query functions
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
// }