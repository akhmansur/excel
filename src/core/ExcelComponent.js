import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()
    this.ubsubscribers = []
  }

  // Настраиваем наш компонент до  init
  prepare() {}

  toHTML() {
    return ''
  }

  // Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.ubsubscribers.push(unsub)
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
    this.ubsubscribers.forEach(unsub => unsub())
  }
}
