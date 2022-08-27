class Cliente{
			constructor(fecha,compañia,asegurado,tipo,poliza,marca,dominio,cobertura,cuota,importe,vencimiento){
				this.fecha=fecha;
				this.compañia=compañia;
				this.asegurado=asegurado;
				this.tipo=tipo;
				this.poliza=poliza;
				this.marca=marca;
				this.dominio=dominio;
				this.cobertura=cobertura;
				this.cuota=cuota;
				this.importe=importe;
				this.vencimiento=vencimiento;
			}

			createData=()=>{

				this.fecha=document.getElementById('date').value;
				this.compañia=document.getElementById('comp').value;
				this.asegurado=document.getElementById('aseg').value;
				this.tipo=document.querySelector('input[name="automotor/motovehiculo/otros"]:checked').value;
				if(this.tipo=="otros"){
					this.tipo=document.getElementById('otros').value;
					//document.getElementById('marca').removeAttribute("required");
					//document.getElementById('dom').removeAttribute("required");
				}
				this.poliza=document.getElementById('pol').value;
				this.marca=document.getElementById('marca').value;
				this.dominio=document.getElementById("dom").value;
				this.cobertura=document.getElementById('cob').value;
				this.cuota=document.getElementById('cuota').value;
				this.importe=document.getElementById("imp").value;
				this.vencimiento=document.getElementById("venc").value;
				

				switch (this.fecha,
				this.compañia,
				this.asegurado,
				this.tipo,
				this.poliza,
				this.marca,
				this.dominio,
				this.cobertura,
				this.cuota,
				this.importe,
				this.vencimiento) {
					case "":
					alert("complete todos los campos");
					break;
					default:
					localStorage.setItem(this.asegurado,JSON.stringify(this));
					break;
				}
			}

			/*searchData=()=>{
				let inicio=prompt("Ingresar DNI del cliente");
				document.getElementById('dni').value=JSON.parse(localStorage.getItem(inicio)).dni;
				document.getElementById('nombre').value=JSON.parse(localStorage.getItem(inicio)).nombre;
				document.getElementById('apellido').value=JSON.parse(localStorage.getItem(inicio)).apellido;
				document.getElementById('dominio').value=JSON.parse(localStorage.getItem(inicio)).dominio;
				document.getElementById('costo').value=JSON.parse(localStorage.getItem(inicio)).costo;
				document.getElementById('vencimiento').value=JSON.parse(localStorage.getItem(inicio)).vencimiento;
			}*/
		}

		if(document.querySelector('input[name="automotor/motovehiculo/otros"]:checked').value=='otros'){
			document.getElementById('marca').removeAttribute("required");
			document.getElementById('dom').removeAttribute("required");
		}

		let cliente=new Cliente;
