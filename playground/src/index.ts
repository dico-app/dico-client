import { $dico, $dicoI18n } from "./dico";

console.log("master");
console.log(`${$dico.baz}`);
console.log(`${$dico.foo.bar}`);
console.log(`${$dico.login}`);
console.log(`${$dico.login.foo}`);
console.log(`${$dico.login.fooo}`);
console.log(`${$dico.login.bar.baz}`);
console.log(`${$dico.login.bar.bazz}`);
console.log(`${$dico.notExists.xx.yy.zz}`);
console.log($dico.notExists.xx.yy.zz);
console.log("");
$dicoI18n.setLocale($dicoI18n.locales["fr-fr"]);
console.log("fr-fr");
console.log(`${$dico.baz}`);
console.log(`${$dico.foo.bar}`);
console.log(`${$dico.login}`);
console.log(`${$dico.login.foo}`);
console.log(`${$dico.login.fooo}`);
console.log(`${$dico.login.bar.baz}`);
console.log(`${$dico.login.bar.bazz}`);
console.log(`${$dico.notExists.xx.yy.zz}`);
console.log($dico.notExists.xx.yy.zz);
