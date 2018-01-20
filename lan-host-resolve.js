// Useful when no any local DNS

const ATTRS = {
  IP: 'ip',
  MAC: 'mac',
  HOSTNAME: 'hostname',
};

// @example [{"ip": "192.168.1.67", "hostname": "inv-phone", "mac": "58:E2:8F:58:CF:10"},,,]
const registry = require('/home/pi/.config/lan-host-resolve.json');

function detectArgType (arg) {
  if (/^(?:\d+\.){3}\d+$/.test(arg)) return ATTRS.IP;
  if (/^(?:\w+:){5}\w+$/.test(arg)) return ATTRS.MAC;
  return ATTRS.HOSTNAME;
}

function resolve(arg, target = ATTRS.IP) {
  const arg_ = arg.trim().toLowerCase();
  const argType = detectArgType(arg_);
  const device =  registry.find(record => record[argType].toLowerCase() === arg_)
	if (!device) {
		console.error(`did not resolved: ${ argType } ${ arg_ }`)
		return null;
	}
  return device[target];
}

module.exports = { ATTRS, detectArgType, registry, resolve };
