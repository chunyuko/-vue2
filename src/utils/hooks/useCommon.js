import { storageSession, storageLocal } from '../storage'
import echarts from '../echarts'

// session
export function useSessionStorage() {
  return storageSession
}
// localStorage
export function useLocalStorage() {
  return storageLocal
}
// echarts
export function useEcharts() {
  return echarts
}
