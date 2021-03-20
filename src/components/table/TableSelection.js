export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  select($el) {
    this.clear()
    $el.focus().addClass('selected')
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) {
    console.log(this.group)
    this.group.forEach($el => $el.css(style))
  }
}
