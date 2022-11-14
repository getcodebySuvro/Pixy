const fileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#canvas");
const canvasCtx = canvas.getContext("2d");

const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const inversionInput = document.querySelector("#inversion");
const contrastInput = document.querySelector("#contrast");
const grayscaleInput = document.querySelector("#grayscale");
const hueRotateInput = document.querySelector("#hueRotate");
const opacityInput = document.querySelector("#opacity");
const sepiaInput = document.querySelector("#sepia");

const btnDownload = document.querySelector("#btnDownload");

const imgwidth = document.getElementById("imgwidth");
const imgheight = document.getElementById("imgheight");
const resize=document.getElementById("resize");

const brightvalue = document.getElementById("brightvalue");
const saturatevalue = document.getElementById("saturatevalue");
const blurvalue = document.getElementById("blurvalue");
const invertvalue = document.getElementById("invertvalue");
const contrastvalue = document.getElementById("contrastvalue");
const grayvalue = document.getElementById("grayvalue");
const huevalue = document.getElementById("huevalue");
const opacityvalue = document.getElementById("opacityvalue");
const sepiavalue = document.getElementById("sepiavalue");





const settings = {};
let image = null;

function resetSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";
  settings.contrast = "100";
  settings.grayscale = "0";
  settings.hueRotate = "0";
  settings.opacity = "100";
  settings.sepia = "0";


  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
  contrastInput.value = settings.contrast;
  grayscaleInput.value = settings.grayscale;
  hueRotateInput.value = settings.hueRotate;
  opacityInput.value = settings.opacity;
  sepiaInput.value = settings.sepia;
}

function updateSetting(key, value) {
  if (!image) return;

  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const { brightness, saturation, blur, inversion , contrast , grayscale , hueRotate , opacity , sepia } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) opacity(${opacity}%) sepia(${sepia}%)`;
}




function renderImage() {
  
  canvas.width = image.width;
  canvas.height = image.height
  
  imgwidth.value=image.width;
  imgheight.value=image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0, image.width, image.height);
}

resize.addEventListener("click",()=>{
  image.width=imgwidth.value;
  image.height=imgheight.value;

  canvas.width = image.width;
  canvas.height = image.height

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0, image.width, image.height);
  
})

brightnessInput.addEventListener("change", () =>{
  updateSetting("brightness", brightnessInput.value);
  brightvalue.innerText = brightnessInput.value;}
);
saturationInput.addEventListener("change", () =>{
  updateSetting("saturation", saturationInput.value)
  saturatevalue.innerText = saturationInput.value;}
);
blurInput.addEventListener("change", () =>
  {updateSetting("blur", blurInput.value);
  blurvalue.innerText = blurInput.value;
}
);
inversionInput.addEventListener("change", () =>
  {updateSetting("inversion", inversionInput.value);
  invertvalue.innerText = inversionInput.value;
}
);
contrastInput.addEventListener("change", () =>
  {updateSetting("contrast", contrastInput.value);
  contrastvalue.innerText = contrastInput.value;
}
);
grayscaleInput.addEventListener("change", () =>
  {updateSetting("grayscale", grayscaleInput.value);
  grayvalue.innerText = grayscaleInput.value;
}
);
hueRotateInput.addEventListener("change", () =>
  {updateSetting("hueRotate", hueRotateInput.value);
  huevalue.innerText = hueRotateInput.value;
}
);
opacityInput.addEventListener("change", () =>
  {updateSetting("opacity", opacityInput.value);
  opacityvalue.innerText = opacityInput.value;
}
);
sepiaInput.addEventListener("change", () =>
  {updateSetting("sepia", sepiaInput.value);
  sepiavalue.innerText = sepiaInput.value;
}
);



fileInput.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
  
});


btnDownload.addEventListener("click",()=>{
  if(image){
    const a=document.createElement("a");
  document.body.appendChild(a);
  a.href=canvas.toDataURL();
  a.download = "pixy-image.png";
  a.click();
  document.body.removeChild(a);
  }else {
    alert("Please upload an image first");
  }
  
})

resetSettings();
