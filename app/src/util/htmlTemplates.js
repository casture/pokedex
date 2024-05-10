const matchHtmlRegExp = /["'&<>]/

function escapeHtml(inputString) {
  const str = '' + inputString
  const match = matchHtmlRegExp.exec(str)

  if (match == null) {
    return str
  }

  let escaped
  let html = ''
  let index = 0
  let lastIndex = 0

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escaped = '&quot;'
        break
      case 38: // &
        escaped = '&amp;'
        break
      case 39: // '
        escaped = '&#39;'
        break
      case 60: // <
        escaped = '&lt;'
        break
      case 62: // >
        escaped = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escaped
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html
}

class HtmlTemplate {
  #html = ''

  constructor(safe, strings, values) {
    let str = ''
    strings.forEach((string, i) => {
      const currentValue = values[i]
      let finalValue
      if (currentValue == null) {
        finalValue = ''
      } else if (currentValue instanceof HtmlTemplate) {
        // Nested templates should have already been escaped
        finalValue = currentValue.value()
      } else if (typeof currentValue === 'string' || currentValue instanceof String) {
        // If the parameters are a string and if it is "safe" then escape the parameters
        if (safe) {
          finalValue = escapeHtml(currentValue)
        } else {
          finalValue = currentValue
        }
      } else if (typeof currentValue.toString === 'function') {
        if (safe) {
          finalValue = escapeHtml(currentValue.toString())
        } else {
          finalValue = currentValue.toString()
        }
      } else {
        // todo: probably not handling error cases well here (wrong types, etc)
        // If there is no value then set to empty string
        finalValue = ''
      }
      str += string + finalValue
    })

    this.#html = str
  }

  value() {
    return this.#html
  }
}

/**
 * @param {string[]} strings
 * @param {string[]} values
 */
function html(strings, ...values) {
  return new HtmlTemplate(true, strings, values)
}

/**
 * @param {string[]} strings
 * @param {string[]} values
 */
function unsafeHtml(strings, ...values) {
  return new HtmlTemplate(false, strings, values)
}

function hfor(items, template) {
  return unsafeHtml`${items.map(item => template(item).value()).join('\n')}`
}

function hIf(condition, trueTemplate, falseTemplate) {
  return condition === true ? trueTemplate : falseTemplate
}

module.exports = {
  html,
  unsafeHtml,
  hfor,
  hIf,
}
