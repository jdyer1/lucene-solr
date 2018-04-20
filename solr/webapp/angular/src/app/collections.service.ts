/*
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ListCollections } from './collections';
import { Collection } from './collections/collections.component';

@Injectable()
export class CollectionsService {
    // TODO: nocommit
    private baseUrl = ''; //'http://localhost:8983';
    private collectionsUrl = this.baseUrl + '/solr/admin/collections';

    constructor(private http: HttpClient) {
    }

    listCollections (): Observable<String[]> {
        return this.http.get<ListCollections>(this.collectionsUrl + "?action=LIST").pipe(map(lc => lc.collections));
    }

    addCollection(coll: Collection ): Observable<Collection> {
      const params: HttpParams = new HttpParams().set('action', 'CREATE');
      params.set('name',coll.name);
      params.set('router.name',coll.routerName);
      params.set('numShards',coll.numShards.toString());
      params.set('collection.configName', coll.configName.toString());
      params.set('replicationFactor',coll.replicationFactor.toString());
      params.set('maxShardsPerNode',coll.maxShardsPerNode.toString());
      params.set('autoAddReplicas',coll.autoAddReplicas.toString());
      params.set('shards',coll.shards);
      params.set('router.field',coll.routerField);

      return this.http.post<Collection>(this.collectionsUrl, coll, {params: params});
    }

}
