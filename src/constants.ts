import CheemscoinFarm from "./artifacts/CheemscoinFarm.json";
import { Interface } from "@ethersproject/abi";
import { LPDetails, Notification, notificationDetails } from "./types";
import { Contract } from "@ethersproject/contracts";
import { TxHash } from "./components/TxHash";
import { FixedNumber } from "@ethersproject/bignumber";

// TODO: Make this right
export const cheemsAddress = "0x060153c56952571389507aa373fc39343607373f";
export const farmAddress = "0x155A65C64C80A5Bd6a294403eb22dEc2226B51E8";
export const iFarm = new Interface(CheemscoinFarm.abi);
export const farmContract = new Contract(farmAddress, iFarm);
export const defaultPool = "0xbd8B3bdce99424a957eFe338ef52d6FDC0Aef417";
export const totalCheems = FixedNumber.from("140");
export const maxLock = 7;

// TODO: Make URLs and addresses correct
export const tokenDetails = (address: string): LPDetails => {
  switch (address) {
    case defaultPool:
      return {
        name: "CHEEMS - XDAI LP",
        exchange: "Honeyswap",
        url: "https://app.honeyswap.org/#/add/0xe91d153e0b41518a2ce8dd3d7944fa863463a97d/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0x898a88e52ff5b96AaD346645c1471Ba8e5625172":
      return {
        name: "CHEEMS - USDC LP",
        exchange: "Sushiswap",
        url: "https://app.honeyswap.org/#/add/0xe91d153e0b41518a2ce8dd3d7944fa863463a97d/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    case "0x22cF19aFDAf9DF62cDE6367012a31E3Ad6e4E485":
      return {
        name: "CHEEMS - BNB LP",
        exchange: "Pancakeswap",
        url: "https://app.honeyswap.org/#/add/0xe91d153e0b41518a2ce8dd3d7944fa863463a97d/0xeaf7b3376173df8bc0c22ad6126943cc8353c1ee?chainId=100",
      };
    default:
      return { name: address, exchange: "Unknown", url: "" };
  }
};

export const notificationInfo = (notification: Notification): notificationDetails => {
  switch (notification.type) {
    case "walletConnected":
      return { status: "success", title: "Wallet Connected" };
    case "transactionStarted":
      return {
        status: "info",
        title: notification.transactionName + " Pending",
        description: TxHash({ notification }),
      };
    case "transactionSucceed":
      return {
        status: "success",
        title: notification.transactionName + " Successful",
        description: TxHash({ notification }),
      };
    case "transactionFailed":
      return { status: "error", title: notification.transactionName + " Failed" };
    default:
      return { status: "error", title: "Unknown error" };
  }
};

// * From now, urls should be put here so if they change, it only needs to be modified in code once
export const buyLink = "http://buy.cheemsco.in";
export const honeyswapLink = "http://price.cheemsco.in";
