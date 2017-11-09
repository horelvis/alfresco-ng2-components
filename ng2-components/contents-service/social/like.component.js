"use strict";
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rating_service_1 = require("./../services/rating.service");
var LikeComponent = (function () {
    function LikeComponent(ratingService) {
        this.ratingService = ratingService;
        this.likesCounter = 0;
        this.ratingType = 'likes';
        this.isLike = false;
        this.changeVote = new core_1.EventEmitter();
    }
    LikeComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.clean();
        var ratingObserver = this.ratingService.getRating(this.nodeId, this.ratingType);
        ratingObserver.subscribe(function (data) {
            if (data.entry.aggregate) {
                _this.likesCounter = data.entry.aggregate.numberOfRatings;
                if (data.entry.ratedAt) {
                    _this.isLike = true;
                }
            }
        });
        return ratingObserver;
    };
    LikeComponent.prototype.likeClick = function () {
        var _this = this;
        if (this.isLike) {
            this.ratingService.deleteRating(this.nodeId, this.ratingType).subscribe(function () {
                _this.likesCounter -= 1;
                _this.isLike = false;
            });
        }
        else {
            this.ratingService.postRating(this.nodeId, this.ratingType, true).subscribe(function (data) {
                _this.likesCounter = data.entry.aggregate.numberOfRatings;
                _this.isLike = true;
            });
        }
        this.changeVote.emit(this.likesCounter);
    };
    LikeComponent.prototype.clean = function () {
        this.isLike = false;
        this.likesCounter = 0;
    };
    __decorate([
        core_1.Input()
    ], LikeComponent.prototype, "nodeId", void 0);
    __decorate([
        core_1.Output()
    ], LikeComponent.prototype, "changeVote", void 0);
    LikeComponent = __decorate([
        core_1.Component({
            selector: 'adf-like',
            styleUrls: ['./like.component.scss'],
            templateUrl: './like.component.html',
            providers: [rating_service_1.RatingService],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], LikeComponent);
    return LikeComponent;
}());
exports.LikeComponent = LikeComponent;
