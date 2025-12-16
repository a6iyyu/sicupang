import { check, sleep } from "k6";
import { get } from "k6/http";

/** @type {import("k6/options").Options} */
export const options = {
  duration: "10s",
  vus: 20,
};

export default function main() {
  check(get("http://localhost:3000"), { "status was 200": (r) => r.status == 200 });
  sleep(1);
}