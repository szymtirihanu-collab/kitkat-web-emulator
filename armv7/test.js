(()=>{const $=id=>document.getElementById(id),log=$("log"),say=s=>{log.textContent+=String(s)+"\n";log.scrollTop=log.scrollHeight;},state=s=>$("state").textContent=s,progress=n=>$("progress").style.width=n+"%";const owner="szymtirihanu-collab",repo="kitkat-web-emulator",api="https://api.github.com/repos/"+owner+"/"+repo;
async function json(url){const r=await fetch(url);if(!r.ok)throw Error("GitHub API "+r.status+" for "+url);return r.json();}
async function artifact(id){const r=await fetch(api+"/actions/artifacts/"+id+"/zip");if(!r.ok)throw Error("Artifact download failed ("+r.status+").");return JSZip.loadAsync(await r.arrayBuffer());}
function find(zip,ends){const names=Object.keys(zip.files);for(const e of ends){const n=names.find(x=>x.endsWith(e)&&!zip.files[x].dir);if(n)return zip.files[n];}throw Error("Missing artifact file: "+ends.join(" / "));}
async function bytes(file){return new Uint8Array(await file.async("arraybuffer"));}
$("prepare").onclick=async()=>{const b=$("prepare");b.disabled=true;log.textContent="";try{
state("Finding the latest QEMU build…");say("Searching public GitHub Actions artifacts.");progress(5);
const [runs,guestArts]=await Promise.all([json(api+"/actions/runs?per_page=30"),json(api+"/actions/runs/41414728013/artifacts")]);
const run=runs.workflow_runs.find(x=>x.name==="Build ARM32 QEMU WebAssembly baseline"&&x.status==="completed"&&x.conclusion==="success");
if(!run)throw Error("No successful QEMU build artifact is published yet. The build workflow must finish successfully first.");
const qArts=await json(api+"/actions/runs/"+run.id+"/artifacts");
const qa=qArts.artifacts.find(x=>x.name==="qemu-system-arm-wasm-baseline"&&!x.expired);
const ga=guestArts.artifacts.find(x=>x.name==="android-4.4-api19-armv7-sdk-image"&&!x.expired);
if(!qa||!ga)throw Error("Required build artifact is missing or expired.");
state("Downloading QEMU and Android 4.4…");say("QEMU artifact: "+qa.name+" (#"+qa.id+")");say("Guest artifact: "+ga.name+" (#"+ga.id+")");progress(12);
const [qz,gz]=await Promise.all([artifact(qa.id),artifact(ga.id)]);progress(55);state("Extracting emulator and guest images…");
const qjs=await bytes(find(qz,["qemu-system-arm.js"])),qwasm=await bytes(find(qz,["qemu-system-arm.wasm"])),qworker=await bytes(find(qz,["qemu-system-arm.worker.js"]));
const kernel=await bytes(find(gz,["extracted/armeabi-v7a/kernel-qemu"])),ramdisk=await bytes(find(gz,["extracted/armeabi-v7a/ramdisk.img"])),system=await bytes(find(gz,["extracted/armeabi-v7a/system.img"])),userdata=await bytes(find(gz,["extracted/armeabi-v7a/userdata.img"]));
say("Loaded kernel, ramdisk, system and userdata.");progress(70);
const wasmUrl=URL.createObjectURL(new Blob([qwasm],{type:"application/wasm"})),workerUrl=URL.createObjectURL(new Blob([qworker],{type:"text/javascript"})),jsUrl=URL.createObjectURL(new Blob([qjs],{type:"text/javascript"}));
window.Module={noInitialRun:true,noExitRuntime:true,wasmBinary:qwasm,locateFile:p=>p.endsWith(".wasm")?wasmUrl:p.endsWith(".worker.js")?workerUrl:p,print:say,printErr:s=>say("QEMU: "+s),onAbort:e=>say("ABORT: "+e),onRuntimeInitialized:()=>{try{const m=window.Module;m.FS.mkdir("/kitkat");for(const [n,v] of [["kernel-qemu",kernel],["ramdisk.img",ramdisk],["system.img",system],["userdata.img",userdata]])m.FS.writeFile("/kitkat/"+n,v);say("All guest images loaded into QEMU virtual filesystem.");progress(90);state("Starting Android boot attempt…");const args=["-M","goldfish","-cpu","cortex-a9","-m","512","-kernel","/kitkat/kernel-qemu","-initrd","/kitkat/ramdisk.img","-append","console=ttyS0 androidboot.hardware=goldfish","-drive","file=/kitkat/system.img,if=none,format=raw,id=system","-device","virtio-blk-device,drive=system","-drive","file=/kitkat/userdata.img,if=none,format=raw,id=data","-device","virtio-blk-device,drive=data","-nographic"];say("$ qemu-system-arm "+args.join(" "));m.callMain(args);}catch(e){say("BOOT ERROR: "+e.message);state("Boot attempt failed; see console.");b.disabled=false;}}};
const s=document.createElement("script");s.src=jsUrl;s.onerror=()=>{throw Error("Could not load QEMU JavaScript.");};document.head.append(s);state("Runtime loading…");progress(80);
}catch(e){say("ERROR: "+(e.message||e));state("Automatic setup failed. See console.");b.disabled=false;progress(0);}};
})();