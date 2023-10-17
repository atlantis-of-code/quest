import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AocUserConfig } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAppInitializerFactory, AocAppModule } from '@atlantis-of-code/aoc-client/components/aoc-app';
import { AocDirectivesModule } from '@atlantis-of-code/aoc-client/core/directives';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiAutocompleteModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-autocomplete';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { Config } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AocUser } from './models/users/aoc-user';

// Set Big.js to strict mode. By this way only Big numbers or strings will be accepted as BigSource.
// @ts-ignore
// Big.strict = true; Tenim marrons per Albarà, antes d'aplicar strict s'ha de revisar bé

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AocDirectivesModule,
    AocUiButtonModule,
    AocUiDatetimePickerModule,
    AocUiAutocompleteModule,
    AocAppModule.forRoot(
      Config,
      new AocUserConfig(AocUser, { fieldMap: { username: 'username', password: 'pass' }}),
      {
        autoConvertEmptyStringsToNullInControls: true,
        autoTrimStringsInControls: true,
        paginator: {
          autocompletePaginatorOptionsPerPage: 20
        },
        dateTimePicker: {
          mode: 'dateTime',
          formats: {
            date: 'MM/dd/y',
            dateTime: 'MM/dd/y h:mm a',
            time: 'h:mm a'
          }
        }
      }
    ),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: AocAppInitializerFactory(Config), multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
