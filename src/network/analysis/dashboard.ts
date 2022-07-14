import ApiRequest from "../index";
enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}
export function getCategoryGoodsCount() {
  return ApiRequest.get({
    url: DashboardAPI.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return ApiRequest.get({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return ApiRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return ApiRequest.get({
    url: DashboardAPI.addressGoodsSale
  });
}
