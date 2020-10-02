declare var jQuery: any;
var $ = jQuery;

export default class Kirby {
	private _blink;

	constructor() {
		this._blink = this.blink();

		this.btnDown();

		window.document.addEventListener( 'keydown', event => {
			if ( event.isComposing || event.keyCode === 229 ) {
				return;
			}

			this.keydown( event );
		});
	}

	// 瞬き
	public blink(){
		// console.log( '瞬き' );
		setInterval(
			function() {
				if ( $( '.Kirby' ).hasClass( 'standby' ) ) {
					var blinksNum = Math.floor( Math.random() * Math.floor( 3 ) ); // 0 ~ 2
					switch ( blinksNum ) {
						case 1:
							$( '.Kirby' ).removeClass( 'blinks--1 blinks--2' )
													 .addClass( 'blinks--' + blinksNum );
							break;
						case 2:
							$( '.Kirby' ).removeClass( 'blinks--1 blinks--2' )
													 .addClass( 'blinks--' + blinksNum );
							break;
						default: // 0
							$( '.Kirby' ).removeClass( 'blinks--1 blinks--2' );
							break;
					}
				}
				else {
					// $( '.Kirby' ).attr( 'class', 'Kirby standby' );
				}
			},
			3000 // 3s
		);
	}

	public btnDown() {
		var _this = this;

		$( '.controlBtn__item' ).on( 'click', function() {
			var a = $( this ).attr( 'class' ).split( 'controlBtn__item--' );
			var position = a[a.length-1];

			switch ( position ) {
				case 'top':
					console.log( position );
					break;

				case 'left':
					_this.direction__lr( 'set--left', 'leftward' );
					break;

				case 'bottom':
					console.log( position );
					break;

				case 'right':
					_this.direction__lr( 'set--right', 'rightward' );
					break;

				default:
					break;
			}
		});
	}

	public keydown( event ) {
		// console.log( this );

		// console.log( event.key );
		var target = document.getElementById( 'message' );

		// animation init
		clearInterval( this._blink );

		switch ( event.key ) {
			case 'w' :
			case 'ArrowUp' :
				target.innerHTML = '↑または Wキー が押されました';
				break;
			case 's' :
			case 'ArrowDown' :
				target.innerHTML = '↓または Sキー が押されました';
				break;
			case 'a' :
			case 'ArrowLeft' :
				target.innerHTML = '←または Aキー が押されました';

				this.direction__lr( 'set--left', 'leftward' );
				break;
			case 'd' :
			case 'ArrowRight' :
				target.innerHTML = '→または Dキー が押されました';

				this.direction__lr( 'set--right', 'rightward');
				break;
			default:
				target.innerHTML = 'キーが押されました key : ' + event.key;
				break;
		}
	}

	//- 左右の向き調整用
	private direction__lr( duringClass, doneClass, callBack = function(){} ) {
		if ( !$( '.Kirby' ).hasClass( doneClass ) ) {
			$( '.Kirby' ).removeClass( 'standby' );
			$( '.Kirby' ).addClass( duringClass );

			var animated = document.querySelector( '.' + duringClass );

			animated.addEventListener( 'animationend', () => {
				$( '.Kirby' ).attr( 'class', '' )
										 .addClass( 'Kirby standby ' + doneClass );
			});
		}

		callBack();
	}
}

// new Kirby();