import { dsv } from 'd3'

export async function load(){
  const fases = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/fases-template.csv")
  const proces = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/20240110%20dpzw_routekaart_proces_v1.csv")
  const product = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/product-template.csv")
  const bpz = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/rz-data/main/BPZ-template.csv")
  return { fases, proces, product, bpz };
}
