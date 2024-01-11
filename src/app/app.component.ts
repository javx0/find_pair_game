import { Component, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'juego_parejas';

  rutasImagenes: any[];

  numeroColumnas = new FormControl('');
  numeroFilas = new FormControl('');

  url = new FormControl('');

  cartas: string[];

  cartaSeleccionada: any;
  containerStyle = "grid-template-columns: auto auto ;";

  jugando = false;

  constructor(){
    this.cartaSeleccionada = {};
    this.cartaSeleccionada.nodo = null;
    this.cartaSeleccionada.valor = "";
    this.cartas = [];
    this.numeroColumnas.setValue("5");
    this.numeroFilas.setValue("4");

    this.rutasImagenes = [
      "https://cdn0.bioenciclopedia.com/es/posts/2/1/2/llama_212_orig.jpg"
    ]
  }

  generarCartas(){
    let cartasOrdenadas = [];
    let filas = <number> <unknown>this.numeroFilas.value;
    let columnas = <number> <unknown> this.numeroColumnas.value;

    let numeroParejas = (filas * columnas) / 2

    for(let i = 0; numeroParejas > i; i++){
      cartasOrdenadas.push(i);
      cartasOrdenadas.push(i)
    }

    let rutasImagenesCopia = [...this.rutasImagenes];

    let contador = 1;
    while(rutasImagenesCopia.length < numeroParejas){
      rutasImagenesCopia.push(contador);
      contador++
    }

    while(rutasImagenesCopia.length > numeroParejas){
      let posicionAleatoria = Math.floor(Math.random() * rutasImagenesCopia.length);
      rutasImagenesCopia.splice(posicionAleatoria,1);
    }

    let cartasDesordenadas: string[];

    cartasDesordenadas = [];

    while(cartasOrdenadas.length > 0){
      let posicionAleatoria = Math.floor(Math.random() * cartasOrdenadas.length)

      cartasDesordenadas.push(rutasImagenesCopia[cartasOrdenadas.splice(posicionAleatoria,1)[0]]);
    }

    this.cartas = cartasDesordenadas
  }

  girarCarta(id:number, valor:string){
    
    let cartaSeleccionadaTemporal = document.getElementById(id + "");

    cartaSeleccionadaTemporal?.classList.add("thecardRotated");
  
    if(this.cartaSeleccionada.nodo == null){
      this.cartaSeleccionada.nodo = cartaSeleccionadaTemporal;
      this.cartaSeleccionada.valor = valor;
    }else{
      if( !(this.cartaSeleccionada.valor == valor)){
        let cartaAnterior = this.cartaSeleccionada.nodo
        setTimeout(() => {
          cartaSeleccionadaTemporal?.classList.remove("thecardRotated");
          cartaAnterior.classList.remove("thecardRotated");
        }, 1000);
      }
      this.cartaSeleccionada.nodo = null
    }

  }

  iniciarJuego(){
    
    let filas = <number> <unknown>this.numeroFilas.value;
    let columnas = <number> <unknown> this.numeroColumnas.value;

    if((columnas * filas) % 2 == 0){
      this.generarCartas();
      this.containerStyle = "grid-template-columns: " + "auto ".repeat(<number> <unknown> this.numeroColumnas.value)
      this.jugando = true;
    }else{
      alert("Error, la cantidad de filas x columnas da una cantidad de cartas impar")
    }
  }

  esNumero(texto:string): boolean{

    return !isNaN(<number> <unknown> texto);
    
  }

  introducirUrl(){
    this.rutasImagenes.push(this.url.value);
    this.url.reset();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.jugando = false
    }
  }
}
