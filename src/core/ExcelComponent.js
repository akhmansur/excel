import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null
    this.prepare()
  }

  // Настраиваем наш компонент до  init
  prepare() {}

  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  // Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners()
  }

  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
