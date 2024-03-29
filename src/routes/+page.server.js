import { dsv } from 'd3'

export async function load(){
  const fases = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_fases_v1.csv")
  const proces = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_proces_v1.csv")
  const product = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_product_v1.csv")
  const bpz = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_bpz_v1.csv")
  const pijlen = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_pijlen_v1.csv")
  const omgeving = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240215%20dpzw_routekaart_omgeving_v1.csv")
  return { fases, proces, product, bpz, pijlen, omgeving };
}


