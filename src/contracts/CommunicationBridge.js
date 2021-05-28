class CommunicationBridge {
  constructor() {
    this.bridge = null
  }

  getBridge() {
    return this.bridge
  }

  setBridge(bridge) {
    this.bridge = bridge
  }

  broadcastGuildMessage(event) {
    return this.bridge.onGuildBroadcast(event)
  }

  broadcastOfficerMessage(event) {
    return this.bridge.onOfficerBroadcast(event)
  }

  broadcastLogin(event) {
    return this.bridge.onLogin(event)
  }

  broadcastLogout(event) {
    return this.bridge.onLogout(event)
  }

  connect() {
    throw new Error('Communication bridge connection is not implemented yet!')
  }

  onGuildBroadcast(event) {
    throw new Error('Communication bridge broadcast handling is not implemented yet!')
  }

  onOfficerBroadcast(event) {
    throw new Error('Communication bridge broadcast handling is not implemented yet!')
  }
}

module.exports = CommunicationBridge
