Array.prototype.playerMove2 = function(NewPosition, MaxLength) {
	var indexOfPrevious = this.indexOf(NewPosition);
	if(indexOfPrevious >= 0) {
		this.splice(indexOfPrevious, 1);
	}
	this.unshift(NewPosition);
	if( this.length > MaxLength ) {
		return this.pop();
	} else {
		return null;
	}
};
Array.prototype.merge = function(val) {
	var uniqueValues = new Array();
	for(var i=0; i<val.length; i++) {
		if( this.indexOf(val[i]) == -1 ) {
			this.push(val[i]);
			uniqueValues.push(val[i]);
		}
	}
	return uniqueValues;
};
Array.prototype.actualSize = function() { // Unique lenght
	var o = {}, i, l = this.length, r = [];
	for(i=0; i<l;i+=1) {
		o[this[i]] = this[i];
	}
	for(i in o) {
		r.push(o[i]);
	}
	return r.length;
};
Array.prototype.intersect = function(b) {
	var results = new Array();
	for(var i=0; i<this.length; i++) {
		if(b.indexOf(this[i]) >= 0) {
			results.push(this[i]);
		}
	}
	return results;
}
var icon_load = 100;
var icon_selected = 101;
var icon_moved = 102;
var icon_occupied = 103;
var icon_attack_animation = 104;
var icon_moveable_0 = 105;
var icon_moveable_1 = 106;
var icon_moveable_2 = 107;
var icon_moveable_3 = 108;
var icon_moveable_4 = 109;
var icon_hack = 0;
var icon_slingshot = 1;
var icon_sentinel = 2;
var UtilityStartIndex = 100;

function IconsFactory(gamePiecesLayer, gameBoardLayer) {
	this.Icons = ({
		 100: {
			 Name: "Load"
			,SVGName: "icon-load"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,101: {
			 Name: "Selection"
			,SVGName: "icon-selected"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,102: {
			 Name: "Moved"
			,SVGName: "icon-moved"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,103: {
			 Name: "Occupied"
			,SVGName: "icon-occupied"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,104: {
			 Name: "AttackAnimation"
			,SVGName: "icon-attack-animation"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,105: {
			 Name: "Moveable0"
			,SVGName: "icon-moveable-0"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,106: {
			 Name: "Moveable0"
			,SVGName: "icon-moveable-1"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,107: {
			 Name: "Moveable0"
			,SVGName: "icon-moveable-2"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,108: {
			 Name: "Moveable0"
			,SVGName: "icon-moveable-3"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,109: {
			 Name: "Moveable0"
			,SVGName: "icon-moveable-4"
			,isEnemy: false
			,isPlayer: false
			,isUtility: true
			,Move: 0
			,MaxSize: 1
			,Attack: null
			,Alternate: null
		}
		,0: {
			 Name: "Hack"
			,SVGName: "icon-hack"
			,Description: "Basic attack program"
			,isEnemy: false
			,isPlayer: true
			,isUtility: false
			,Move: 2
			,MaxSize: 3
			,Attack: [
						{Name: "Slice", MinSizeForAttack: 1, Attack: 2, AttackSize: 1}
					]
			,Alternate: []
		}
		,1: {
			 Name: "Slingshot"
			,SVGName: "icon-slingshot"
			,Description: "Basic short range attack program"
			,isEnemy: false
			,isPlayer: true
			,isUtility: false
			,Move: 2
			,MaxSize: 2
			,Attack: [
						{Name: "Stone", MinSizeForAttack: 1, Attack: 2, AttackSize: 2}
					]
			,Alternate: []
		}
		,2: {
			 Name: "Sentinel"
			,SVGName: "icon-sentinel"
			,Description: "Basic guard"
			,isEnemy: true
			,isPlayer: false
			,isUtility: false
			,Move: 2
			,MaxSize: 3
			,Attack: [
						{Name: "Cut", MinSizeForAttack: 1, Attack: 1, AttackSize: 1}
					]
			,Alternate: []
			,AI: "AttackInRangeOrMoveToFirstPlayerYX"
		}
		//Static(ish) Properties
		,DelayAttack: 400
		,DelayMove: 200
	});
	this.createIcon = function(IconIndex, InitalizePositions, RegisterIcon) {
		var superClass = this.Icons;
		//var rectPosition = this.Icons.GetPositionData(InitalizePositions[0]);
		var rectPosition = gameBoardLayer.RectData[InitalizePositions[0]];
		var icon = document.createElementNS(svgNS, "use");
		icon.setAttributeNS(xlinkNS, "href", "#" + this.Icons[IconIndex].SVGName );
		icon.setAttribute("x", rectPosition.x);
		icon.setAttribute("y", rectPosition.y);
		icon.setAttribute("transform", rectPosition.transform);
		gamePiecesLayer.appendChild(icon);
		//Custom Methods/Data
		icon.IconData = this.Icons[IconIndex];
		icon.Target = null;
		icon.Position = InitalizePositions.clone(); //We will allow the inital state to be contrary to the allowable state in gameplay
		icon.Rects = new Array();
		icon.Selected = null;
		icon.CompletedMove = null;
		icon.MovementIndicators = null;
		icon.RemainingMoves = 0;
		for(var i=1; i<InitalizePositions.length; i++) {
			//var rectPosition = GetPositionData(InitalizePositions[i]);
			var rectPosition = gameBoardLayer.RectData[InitalizePositions[i]];
			var rect = document.createElementNS(svgNS, "use");
			rect.setAttributeNS(xlinkNS, "href", "#" + this.Icons[icon_occupied].SVGName);
			rect.setAttribute("x", rectPosition.x);
			rect.setAttribute("y", rectPosition.y);
			rect.setAttribute("transform", rectPosition.transform);
			rect.setAttribute("width", rectPosition.width);
			rect.setAttribute("height", rectPosition.height);
			rect.style.fill = getValueFromStyleSheet("icons", "#" + this.Icons[IconIndex].SVGName + " " + ".icon", "fill");
			rect.Position = InitalizePositions[i];
			gamePiecesLayer.appendChild(icon);
			icon.Rects.push(rect);
		}
		//Allow for object to be tracked by others
		if( RegisterIcon ) {
			if( icon.IconData.isEnemy ) {
				window.enemies.push(icon);
			} else if( icon.IconData.isPlayer ) {
				window.players.push(icon);
			} else if( icon.IconData.isUtility ) {
				window.utilities.push(icon);
			}
		}
		//Methods
		icon.CanMove = function() {
			return ((!this.IconData.isUtility) && (this.IconData.Move > 0))
		};
		icon.CanMoveDirection = function(direction) {
			if( this.CanMove() ) {
				var newPoint = null;
				switch(direction) {
					case "Up":
						newPoint = gameBoardLayer.PointAbovePoint(this.Position[0], 1);
						break;
					case "Down":
						newPoint = gameBoardLayer.PointBelowPoint(this.Position[0], 1);
						break;
					case "Left":
						newPoint = gameBoardLayer.PointLeftToPoint(this.Position[0], 1);
						break;
					case "Right":
						newPoint = gameBoardLayer.PointRightToPoint(this.Position[0], 1);
						break;
					default:
						console.log("invalid direction: " + direction.toString());
				}
				if(newPoint != null) {
					var pointState = gameBoardLayer.PointState(newPoint);
					if( pointState.isVisible && (pointState.occupiedBy == null) ) {
						return true;
					} else {
						return false;
					}
				} else {
					console.log("point " + direction + " invalid");
					return false;
				}
			} else {
				console.log("Cannot CanMove()");
				return false;
			}
		};
		icon.CanMoveUp = function() {
			return this.CanMoveDirection("Up");
		};
		icon.CanMoveDown = function() {
			return this.CanMoveDirection("Down");
		};
		icon.CanMoveLeft = function() {
			return this.CanMoveDirection("Left");
		};
		icon.CanMoveRight = function() {
			return this.CanMoveDirection("Right");
		};
		icon.MoveOne = function(direction) {
			var newPoint;
			switch(direction) {
				case "Up":
					newPoint = gameBoardLayer.PointAbovePoint(this.Position[0], 1);
					break;
				case "Down":
					newPoint = gameBoardLayer.PointBelowPoint(this.Position[0], 1);
					break;
				case "Left":
					newPoint = gameBoardLayer.PointLeftToPoint(this.Position[0], 1);
					break;
				case "Right":
					newPoint = gameBoardLayer.PointRightToPoint(this.Position[0], 1);
					break;
				default:
					console.log("invalid direction: " + direction.toString());
			}
			if( gameBoardLayer.PointIsValid(newPoint) ) { //prevent off board moves but not overlapping enemies
				//var newPositionData = superClass.GetPositionData(newPoint);
				var newPositionData = gameBoardLayer.RectData[newPoint];
				var removeRectPosition = this.Position.playerMove2(newPoint, this.IconData.MaxSize);
				icon.setAttribute("x", newPositionData.x);
				icon.setAttribute("y", newPositionData.y);
				for(var i=1; i<this.Position.length; i++) {
					//var positionData = superClass.GetPositionData(this.Position[i]);
					var positionData = gameBoardLayer.RectData[this.Position[i]];
					if( this.Rects.length >= i ) {
						if(this.Rects[i-1].Position != this.Position[i]) {
							this.Rects[i-1].Position = this.Position[i];
							this.Rects[i-1].setAttribute("x", positionData.x);
							this.Rects[i-1].setAttribute("y", positionData.y);
						}
					} else {
						var rect = document.createElementNS(svgNS, "use");
						rect.setAttributeNS(xlinkNS, "href", "#" + superClass[icon_occupied].SVGName);
						rect.setAttribute("x", positionData.x);
						rect.setAttribute("y", positionData.y);
						rect.setAttribute("transform", positionData.transform);
						rect.setAttribute("width", positionData.width);
						rect.setAttribute("height", positionData.height);
						rect.setAttribute("fill", getValueFromStyleSheet("icons", "#" +this.IconData.SVGName + " " + ".icon", "fill"));
						rect.Position = this.Position[i];
						gamePiecesLayer.appendChild(rect);
						this.Rects.push(rect);
					}
				}
				while(this.Rects.length >= this.IconData.MaxSize) {
					var rect = this.Rects.pop();
					rect.parentNode.removeChild(rect);
				}
				gamePiecesLayer.appendChild(this);
			} else {
				console.log("invalid move - cannot move " + direction);
			}
		};
		icon.ChainMoves = function(moveList) {
			var timingDelay = 0;
			for(var i=0; i<moveList.length; i++) {
				setTimeout(function(a, b) {
					a.MoveOne(b);
				}, superClass.DelayMove + timingDelay
				, this, moveList[i]);
				timingDelay += superClass.DelayMove;
			}
		};
		icon.MoveUp = function() {
			setTimeout(function(a) {
				a.MoveOne("Up");
			}, superClass.DelayMove, this);
		};
		icon.MoveDown = function() {
			setTimeout(function(a) {
				a.MoveOne("Down");
			}, superClass.DelayMove, this);
		};
		icon.MoveLeft = function() {
			setTimeout(function(a) {
				a.MoveOne("Left");
			}, superClass.DelayMove, this);
		};
		icon.MoveRight = function() {
			setTimeout(function(a) {
				a.MoveOne("Right");
			}, superClass.DelayMove, this);
		};
		icon.MakeMove = function() {
			console.log("calculating best move");
		};
		icon.BeAttacked = function(AttackStrength) {
			var iconIsErased = false;
			var timingDelay = 0;
			for(var i=0; ((i<AttackStrength) && (this.Position.length > 0) && (!iconIsErased)); i++) {
				var attackPoint = this.Position.pop();
				//var attackPositionData = superClass.GetPositionData(attackPoint);
				var attackPositionData = gameBoardLayer.RectData[attackPoint];
				var nodeToDestroy = null;
				if(this.Rects.length > 0) {
					nodeToDestroy = this.Rects.pop();
				} else {
					iconIsErased = true;
					nodeToDestroy = this;
				}
				setTimeout(function(a, b, icon) {
					var scale = squareSize/100;
					var g = document.createElementNS(svgNS, "g");
					g.setAttribute("transform", "translate(" + a.actualX.toString() + "," + a.actualY.toString() + ")" );
					var use = document.createElementNS(svgNS, "use");
					use.setAttribute("transform", "scale(" + scale.toString() + "," + scale.toString() + ")");
					use.setAttributeNS(xlinkNS, "href", "#" + superClass[icon_attack_animation].SVGName);
					var animatableObjects = new Array();
					var s = new Array();
					s.push( icon.getElementsByTagName("set") );
					s.push( icon.getElementsByTagName("animateMotion") );
					s.push( icon.getElementsByTagName("animate") );
					s.push( icon.getElementsByTagName("animateTransform") );
					for(var i=0;i<s.length; i++) {
						for(var j=0; j<s[i].length; j++) {
							var c = s[i][j].cloneNode();
							use.appendChild(c);
							animatableObjects.push(c);
						}
					}
					animatableObjects[0].addEventListener("end", function() {
						g.parentNode.removeChild(g);
						b.parentNode.removeChild(b);
					}, false);
					g.appendChild(use);
					gamePiecesLayer.appendChild(g);
					for(var i=0; i<animatableObjects.length; i++) {
						animatableObjects[i].beginElement();
					}
				}, superClass.DelayAttack + timingDelay
				, attackPositionData, nodeToDestroy, document.getElementById(superClass[icon_attack_animation].SVGName));
				timingDelay += superClass.DelayAttack;
			}
		};
		icon.userIndicatedMove = function(Point, IconToMove) {
			console.log("der movin: " + Point.toString());
			if( Point == (this.Position[0] + 1) ) {
				return function() {
					IconToMove.MoveRight();
				};
			} else if( Point == (this.Position[0] + 16) ) {
				return function() {
					IconToMove.MoveDown();
				};
			} else if( Point == (this.Position[0] - 1) ) {
				return function() {
					IconToMove.MoveLeft();
				};
			} else if( Point == (this.Position[0] - 16) ) {
				return function() {
					IconToMove.MoveUp();
				};
			}
		};
		icon.ShowMoveablePlaces = function() {
			if(this.MovementIndicators != null) {
				for(var i=0; i<this.MovementIndicators.length; i++) {
					this.MovementIndicators[i].parentNode.removeChild(this.MovementIndicators[i]);
				}
			} else {
				this.MovementIndicators = new Array();
			}
			var depthMarker = new Array();
			var badPoints = gameBoardLayer.BranchOut(this.Position[0], this.IconData.Move, ({FilterType: "NonMoveable", FilterSubType: this }));
			var moveablePlaces = this.getCardinalPoints(this.Position[0]);
			moveablePlaces.remove(badPoints);
			for(var i=1; i<this.IconData.Move; i++) {
				var newPoints = null;
				var moveablePlacesLength = moveablePlaces.length;
				depthMarker.push(moveablePlacesLength);
				for(var k=0; k<moveablePlacesLength; k++) {
					newPoints = this.getCardinalPoints(moveablePlaces[k]);
					newPoints.remove(badPoints);
					moveablePlaces.merge(newPoints);
				}
			}
			moveablePlaces.remove(this.Position[0]);
			var iconSet = 0;
			for(var j=0; j<moveablePlaces.length; j++) {
				var iconIndex = icon_moveable_4;
				var hookEvent = false;
				switch(iconSet) {
					case 0:
						iconIndex = icon_moveable_0;
						hookEvent = true;
						break;
					case 1:
						iconIndex = icon_moveable_1;
						break;
					case 2:
						iconIndex = icon_moveable_2;
						break;
					case 3:
						iconIndex = icon_moveable_3;
						break;
					default:
						iconIndex = icon_moveable_4;
						break;
				}
				var iconFactoryInstance = new IconsFactory(gamePiecesLayer, gameBoardLayer);
				var mover = iconFactoryInstance.createIcon(iconIndex, [moveablePlaces[j]], false);
				this.MovementIndicators.push(mover);
				if(hookEvent) {
					var iconToMove = this;
					mover.addEventListener("click", iconToMove.userIndicatedMove(mover.Position[0], this), false);
				}
				delete iconFactoryInstance;
				if( (j+1) >= depthMarker[iconSet] ) {
					iconSet++;
				}
			}
		};
		icon.getCardinalPoints = function(Point) {
			return [
				 gameBoardLayer.PointAbovePoint(Point, 1)
				,gameBoardLayer.PointBelowPoint(Point, 1)
				,gameBoardLayer.PointLeftToPoint(Point, 1)
				,gameBoardLayer.PointRightToPoint(Point, 1)
			];
		};
		icon.ShowAttackablePlaces = function() {
			console.log("requires game board functionality");
		};
		icon.ClearCompletedMove = function() {
			if(this.CompletedMove != null) {
				this.CompletedMove.parentNode.removeChild(this.CompletedMove);
			}
		};
		icon.ShowCompletedMove = function() {
			if(this.CompletedMove == null) {
				this.CompletedMove = document.createElementNS(svgNS, "use");
				this.CompletedMove.setAttribute("x", this.getAttribute("x"));
				this.CompletedMove.setAttribute("y", this.getAttribute("y"));
				this.CompletedMove.setAttribute("transform", this.getAttribute("transform"));
				this.CompletedMove.setAttributeNS(xlinkNS, "href", "#" + superClass[icon_moved].SVGName);
				gamePiecesLayer.appendChild(this.CompletedMove);
			}
		};
		icon.ShowSelected = function() {
			if(this.Selected == null) {
				this.Selected = document.createElementNS(svgNS, "use");
				this.Selected.setAttribute("x", this.getAttribute("x"));
				this.Selected.setAttribute("y", this.getAttribute("y"));
				this.Selected.setAttribute("transform", this.getAttribute("transform"));
				this.Selected.setAttributeNS(xlinkNS, "href", "#" + superClass[icon_selected].SVGName);
				gamePiecesLayer.appendChild(this.Selected);
			}
		};
		icon.ClearSelected = function() {
			if(this.Selected != null) {
				this.Selected.parentNode.removeChild(this.Selected);
			}
		};
		return icon;
	}
}
/*
var iconFactory = new IconsFactory( $elem("layer_gamePieces") , $elem("gameBoard"), true );
var u1 = iconFactory.createIcon(0, [40+16*3], true);
u1.BeAttacked(1)
// Up
console.clear();
console.log("Can move: " + u1.CanMove().toString() + " up: " + u1.CanMoveUp().toString() + " down: " + u1.CanMoveDown().toString() + " left: " + u1.CanMoveLeft().toString() + " right: " + u1.CanMoveRight().toString() );
console.log("Position:");
console.log(u1.Position);
console.log("Rects:");
console.log(u1.Rects);
u1.MoveUp();
// Down
console.clear();
console.log("Can move: " + u1.CanMove().toString() + " up: " + u1.CanMoveUp().toString() + " down: " + u1.CanMoveDown().toString() + " left: " + u1.CanMoveLeft().toString() + " right: " + u1.CanMoveRight().toString() );
console.log("Position:");
console.log(u1.Position);
console.log("Rects:");
console.log(u1.Rects);
u1.MoveDown();
//Left
console.clear();
console.log("Can move: " + u1.CanMove().toString() + " up: " + u1.CanMoveUp().toString() + " down: " + u1.CanMoveDown().toString() + " left: " + u1.CanMoveLeft().toString() + " right: " + u1.CanMoveRight().toString() );
console.log("Position:");
console.log(u1.Position);
console.log("Rects:");
console.log(u1.Rects);
u1.MoveLeft();
//Right
console.clear();
console.log("Can move: " + u1.CanMove().toString() + " up: " + u1.CanMoveUp().toString() + " down: " + u1.CanMoveDown().toString() + " left: " + u1.CanMoveLeft().toString() + " right: " + u1.CanMoveRight().toString() );
console.log("Position:");
console.log(u1.Position);
console.log("Rects:");
console.log(u1.Rects);
u1.MoveRight();
*/